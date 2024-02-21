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

function NotPaidOrderCard({ order }: Props) {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { payOrder, cancelOrder } = useAdminOrder(workspaceId);

  return (
    <Container>
      <div>주문번호: {order.id}번</div>
      <div>이름: {order.customerName}</div>
      <div>{order.totalPrice.toLocaleString()}원</div>
      <button type={'button'} onClick={() => payOrder(order.id)}>
        결제 완료
      </button>
      <button type={'button'} onClick={() => cancelOrder(order.id)}>
        주문 취소
      </button>
    </Container>
  );
}

export default NotPaidOrderCard;
