import React, { useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { orderBasketAtom, userWorkspaceAtom } from '@recoils/atoms';
import _ from 'lodash';
import styled from '@emotion/styled';
import AppLabel from '@components/common/label/AppLabel';
import AppBadge from '@components/common/badge/AppBadge';
import OrderButton from '@components/user/order/OrderButton';
import AppInputWithLabel from '@components/common/input/AppInputWithLabel';
import useApi from '@hooks/useApi';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Order } from '@@types/index';

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
  background: white;
  position: sticky;
  top: 0;
  width: 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25px;
  box-sizing: border-box;
  z-index: 100;
`;

const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 70vh;
  gap: 20px;
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
  const { userApi } = useApi();
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
    const costumerName = customerNameRef.current?.value;

    if (!costumerName) {
      alert('입금자명을 입력해주세요.');
      return;
    }

    userApi
      .post<Order>('/order', {
        workspaceId: workspaceId,
        tableNumber: tableNo,
        orderProducts: orderBasket,
        customerName: costumerName,
      })
      .then((res) => {
        navigate(`/order-complete?orderId=${res.data.id}`);
      });
    window.open(`${tossAccountUrl}&amount=${totalAmount}`);
  };

  return (
    <Container>
      <Header>
        <AppLabel>주문 결제</AppLabel>
        <AppBadge>{totalAmount.toLocaleString()}원</AppBadge>
      </Header>
      <SubContainer>
        <AppInputWithLabel titleLabel={'입금자명'} placeholder={'입금자명을 입력해주세요.'} style={{ width: '300px' }} ref={customerNameRef} />
        <AppLabel size={12}>입력한 입금자명과 실제로 입금한 입금자명이 다를 경우 결제 확인이 불가능합니다.</AppLabel>
        <AppLabel size={12}>아래 버튼을 누르면 주문이 완료되며, 토스 송금 창으로 이동합니다.</AppLabel>
        <AppLabel size={12}>송금 완료 후 다시 이 페이지로 돌아오면 주문 내역을 확인하실 수 있습니다.</AppLabel>
      </SubContainer>
      <OrderButton amount={totalAmount} buttonLabel={`Toss로 결제하기`} onClick={payOrder} />
    </Container>
  );
}

export default OrderPay;
