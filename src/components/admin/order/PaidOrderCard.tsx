import React from 'react';
import { Order } from '@@types/index';
import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';
import useAdminOrder from '@hooks/useAdminOrder';

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
  const { serveOrder, cancelOrder } = useAdminOrder(workspaceId);

  return (
    <Container>
      <div>주문번호: {order.id}번</div>
      <div>{order.tableNumber}번 테이블</div>
      <div>{order.totalPrice.toLocaleString()}원</div>
      {order.orderProducts.map((it) => (
        <div key={it.id}>
          {it.product.name} - {it.quantity}개
        </div>
      ))}
      <button type={'button'} onClick={() => serveOrder(order.id)}>
        서빙 완료
      </button>
      <button type={'button'} onClick={() => cancelOrder(order.id)}>
        주문 취소
      </button>
    </Container>
  );
}

export default PaidOrderCard;
