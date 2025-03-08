import React, { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { orderBasketAtom, userWorkspaceAtom } from '@recoils/atoms';
import _ from 'lodash';
import styled from '@emotion/styled';
import OrderButton from '@components/user/order/OrderButton';
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import { colFlex } from '@styles/flexStyles';
import useOrder from '@hooks/user/useOrder';
import OrderStickyNavBar from '@components/admin/order/OrderStickyNavBar';
import { Color } from '@resources/colors';
import OrderPayNavBar from '@components/admin/order/OrderPayNavBar';

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const SubContainer = styled.div`
  margin-top: 45px;
  gap: 20px;
  ${colFlex({ justify: 'center', align: 'center' })}
`;

const InputContainer = styled.div`
  padding-top: 20px;
  padding-bottom: 20px;
  ${colFlex({ align: 'center' })}
`;

const Input = styled.input`
  width: 300px;
  height: 40px;
  padding: 0 10px;
  border: none;
  border-bottom: 1px solid #898989;
  font-size: 14px;
`;

const DescriptionContainer = styled.div`
  width: 100%;
  height: 100px;
  background: ${Color.LIGHT_GREY};
  ${colFlex({ justify: 'center', align: 'center' })}
`;

const Description = styled.div`
  width: 100%;
  font-size: 13px;
  font-weight: 500;
  color: #898989;
  padding: 0 40px;
  text-align: center;
  box-sizing: border-box;
`;

function OrderPay() {
  const [isTossPay, setIsTossPay] = useState<boolean>(false);
  const customerNameRef = useRef<HTMLInputElement>(null);

  const workspace = useRecoilValue(userWorkspaceAtom);
  const orderBasket = useRecoilValue(orderBasketAtom);
  const productsMap = _.keyBy(workspace.products, 'id');
  const totalAmount = orderBasket.reduce((acc, cur) => {
    return acc + productsMap[cur.productId].price * cur.quantity;
  }, 0);

  const navigate = useNavigate();
  const { createOrder } = useOrder();
  const [searchParams] = useSearchParams();
  const workspaceId = searchParams.get('workspaceId');
  const tableNo = searchParams.get('tableNo');

  const tossAccountUrl = workspace.owner.accountUrl;

  useEffect(() => {
    if (orderBasket.length === 0) {
      alert('잘못된 접근입니다.');
      navigate(1);
    }
    customerNameRef.current?.focus();
  }, [isTossPay]);

  const payOrder = () => {
    const customerName = customerNameRef.current?.value;

    if (!customerName) {
      alert('입금자명을 입력해주세요.');
      return;
    }

    createOrder(workspaceId, tableNo, orderBasket, customerName).then((res) => {
      navigate({
        pathname: '/order-complete',
        search: createSearchParams({
          orderId: res.data.id.toString(),
          workspaceId: workspaceId || '',
        }).toString(),
      });

      if (totalAmount == 0) return;

      window.open(`${tossAccountUrl}&amount=${totalAmount}`);
    });
  };

  return (
    <Container className={'order-pay-container'}>
      <OrderStickyNavBar showNavBar={true} workspaceName={workspace.name} tableNo={tableNo} useShareButton={false} />
      <SubContainer className={'order-pay-sub-container'}>
        <OrderPayNavBar isTossPay={isTossPay} setIsTossPay={setIsTossPay} />
        <InputContainer>
          <Input type="text" placeholder={'입금자명을 입력해주세요.'} ref={customerNameRef} />
        </InputContainer>
        <DescriptionContainer>
          <Description>
            입력하신 입금자명과 실제 입금자명이 일치하지 않을 경우 결제 확인이 어려울 수 있습니다. 아래 버튼을 클릭하시면 주문이 완료되며, 토스 송금 페이지로
            이동합니다.
          </Description>
        </DescriptionContainer>
      </SubContainer>
      <OrderButton showButton={orderBasket.length > 0} buttonLabel={totalAmount == 0 ? '주문하기' : `Toss로 결제하기`} onClick={payOrder} />
    </Container>
  );
}

export default OrderPay;
