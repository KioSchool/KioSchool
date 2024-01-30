import React from 'react';
import { Order } from '@@types/index';
import styled from '@emotion/styled';
import useApi from '@hooks/useApi';
import { useParams } from 'react-router-dom';
import useOrdersWebsocket from '@hooks/useOrdersWebsocket';

interface Props {
  order: Order;
}

const Container = styled.div`
  padding: 12px;
  border: 1px solid black;
  border-radius: 8px;
  width: 240px;
`;

function NotPaidOrderCard({ order }: Props) {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { fetchOrders } = useOrdersWebsocket(workspaceId);
  const { adminApi } = useApi();

  const payOrder = () => {
    adminApi.post<Order>('/order/pay', { orderId: order.id, workspaceId: Number(workspaceId) }).then(() => {
      fetchOrders();
    });
  };

  return (
    <Container>
      <div>주문번호: {order.id}번</div>
      <div>이름: {order.customerName}</div>
      <div>{order.totalPrice.toLocaleString()}원</div>
      <button type={'button'} onClick={payOrder}>
        결제 완료
      </button>
    </Container>
  );
}

export default NotPaidOrderCard;
