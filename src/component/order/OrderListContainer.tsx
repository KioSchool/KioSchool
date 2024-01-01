import React from 'react';
import { Order } from '../../type';
import styled from '@emotion/styled';
import OrderCard from './OrderCard';

interface Props {
  orders: Order[];
}

const Container = styled.div`
  padding: 24px;
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  width: 100%;
`;

function OrderListContainer({ orders }: Props) {
  const notPaidOrders = orders.filter((it) => it.status === 'NOT_PAID');
  const paidOrders = orders.filter((it) => it.status === 'PAID');
  const servedOrders = orders.filter((it) => it.status === 'SERVED');

  return (
    <Container>
      {notPaidOrders.map((it) => (
        <OrderCard order={it} key={it.id} />
      ))}
      {paidOrders.map((it) => (
        <OrderCard order={it} key={it.id} />
      ))}
      {servedOrders.map((it) => (
        <OrderCard order={it} key={it.id} />
      ))}
    </Container>
  );
}

export default OrderListContainer;
