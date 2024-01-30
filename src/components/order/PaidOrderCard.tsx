import React from 'react';
import { Order } from '../../types';
import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';
import useApi from '../../hooks/useApi';
import useOrdersWebsocket from '../../hooks/useOrdersWebsocket';

interface Props {
  order: Order;
}

const Container = styled.div`
  padding: 12px;
  border: 1px solid black;
  border-radius: 8px;
  width: 240px;
`;

function PaidOrderCard({ order }: Props) {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { fetchOrders } = useOrdersWebsocket(workspaceId);
  const { adminApi } = useApi();

  const serveOrder = () => {
    adminApi.post<Order>('/order/serve', { orderId: order.id, workspaceId: Number(workspaceId) }).then(() => {
      fetchOrders();
    });
  };

  return (
    <Container>
      <div>주문번호: {order.id}번</div>
      <div>{order.tableNumber}번 테이블</div>
      <div>{order.totalPrice}원</div>
      {order.orderProducts.map((it) => (
        <div key={it.id}>
          {it.product.name} - {it.quantity}개
        </div>
      ))}
      <button type={'button'} onClick={serveOrder}>
        서빙 완료
      </button>
    </Container>
  );
}

export default PaidOrderCard;
