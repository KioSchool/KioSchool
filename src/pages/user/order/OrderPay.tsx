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
import OrderPayNavBar from '@components/admin/order/OrderPayNavBar';
import OrderPayAccountInfo from '@components/user/order/OrderPayAccountInfo';

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
  ${colFlex({ justify: 'center', align: 'center' })}
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
          <OrderPayAccountInfo isTossPay={isTossPay} />
        </DescriptionContainer>
      </SubContainer>
      <OrderButton showButton={orderBasket.length > 0} buttonLabel={totalAmount == 0 ? '주문하기' : `Toss로 결제하기`} onClick={payOrder} />
    </Container>
  );
}

export default OrderPay;
