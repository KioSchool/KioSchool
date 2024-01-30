import React from 'react';
import { Order } from '@@types/index';
import styled from '@emotion/styled';

interface Props {
  order: Order;
}

const Container = styled.div`
  padding: 12px;
  border: 1px solid black;
  border-radius: 8px;
  width: 240px;
  background: gray;
`;

function ServedOrderCard({ order }: Props) {
  return (
    <Container>
      <div>주문번호: {order.id}번</div>
      <div>{order.totalPrice}원</div>
    </Container>
  );
}

export default ServedOrderCard;
