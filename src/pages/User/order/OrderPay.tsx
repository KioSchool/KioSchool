import React, { useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { orderBasketAtom, userWorkspaceAtom } from '@recoils/atoms';
import _ from 'lodash';
import styled from '@emotion/styled';
import AppLabel from '@components/common/label/AppLabel';
import AppBadge from '@components/common/badge/AppBadge';
import OrderButton from '@components/user/order/OrderButton';
import AppInputWithLabel from '@components/common/input/AppInputWithLabel';
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import { colFlex, rowFlex } from '@styles/flexStyles';
import useOrder from '@hooks/user/useOrder';
import { Color } from '@resources/colors';

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  animation: moveInFromRight 0.3s;

  @keyframes moveInFromRight {
    from {
      opacity: 0;
      transform: translateX(100%);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

const Header = styled.div`
  background: ${Color.WHITE};
  position: sticky;
  top: 0;
  width: 100vw;
  padding: 25px;
  box-sizing: border-box;
  z-index: 100;
  ${rowFlex({ justify: 'space-between', align: 'center' })}
`;

const SubContainer = styled.div`
  height: 70vh;
  gap: 20px;
  ${colFlex({ justify: 'center', align: 'center' })}
`;

function OrderPay() {
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
  }, []);

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
      <Header className={'order-pay-header'}>
        <AppLabel>주문 결제</AppLabel>
        <AppBadge>{totalAmount.toLocaleString()}원</AppBadge>
      </Header>
      <SubContainer className={'order-pay-sub-container'}>
        <AppInputWithLabel titleLabel={'입금자명'} placeholder={'입금자명을 입력해주세요.'} style={{ width: '300px' }} ref={customerNameRef} />
        <AppLabel size={12}>입력한 입금자명과 실제로 입금한 입금자명이 다를 경우 결제 확인이 불가능합니다.</AppLabel>
        <AppLabel size={12}>아래 버튼을 누르면 주문이 완료되며, 토스 송금 창으로 이동합니다.</AppLabel>
        <AppLabel size={12}>송금 완료 후 다시 이 페이지로 돌아오면 주문 내역을 확인하실 수 있습니다.</AppLabel>
      </SubContainer>
      <OrderButton showButton={orderBasket.length > 0} buttonLabel={totalAmount == 0 ? '주문하기' : `Toss로 결제하기`} onClick={payOrder} />
    </Container>
  );
}

export default OrderPay;
