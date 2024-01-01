import React from 'react';
import { Order } from '../../type';
import styled from '@emotion/styled';
import PaidOrderCard from './PaidOrderCard';
import NotPaidOrderCard from './NotPaidOrderCard';

interface Props {
  orders: Order[];
}

const Container = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
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
      <div>
        {notPaidOrders.map((it) => (
          <NotPaidOrderCard order={it} key={it.id} />
        ))}
      </div>
      <div>
        {paidOrders.map((it) => (
          <PaidOrderCard order={it} key={it.id} />
        ))}
      </div>
      <div>
        {servedOrders.map((it) => (
          <PaidOrderCard order={it} key={it.id} />
        ))}
      </div>
    </Container>
  );
}

export default OrderListContainer;
