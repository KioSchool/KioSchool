import React from 'react';
import { Order } from '../../type';
import styled from '@emotion/styled';

interface Props {
  order: Order;
}

const Container = styled.div`
  padding: 12px;
  border: 1px solid black;
  border-radius: 8px;
  width: 240px;
`;

function OrderCard({ order }: Props) {
  return (
    <Container>
      <div>{order.tableNumber}번 테이블</div>
      <div>{order.totalPrice}원</div>
      {order.orderProducts.map((it) => (
        <div key={it.id}>
          {it.product.name} - {it.quantity}개
        </div>
      ))}
    </Container>
  );
}

export default OrderCard;