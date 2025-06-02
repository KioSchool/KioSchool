import React, { memo } from 'react';
import styled from '@emotion/styled';
import { Order, OrderStatus } from '@@types/index';
import { colFlex, rowFlex } from '@styles/flexStyles';
import AppLabel from '@components/common/label/AppLabel';
import NotPaidOrderCard from './NotPaidOrderCard';
import PaidOrderCard from './PaidOrderCard';
import ServedOrderCard from './ServedOrderCard';
import { areOrdersEquivalent } from '@utils/MemoCompareFunction';

const OrderCardListContainer = styled.div`
  ${colFlex({ align: 'start' })}
  gap: 10px;
  width: 100%;
  overflow-x: auto;
`;

const CardListContainer = styled.div`
  ${rowFlex()}
  gap: 10px;
  height: 180px;
`;

interface OrderStatusListProps {
  orders: Order[];
  title: string;
}

function areOrdersEqual(prevOrders: Order[], nextOrders: Order[]) {
  if (prevOrders.length !== nextOrders.length) return false;

  return prevOrders.every((prevOrder, index) => {
    const nextOrder = nextOrders[index];
    return areOrdersEquivalent(prevOrder, nextOrder);
  });
}

const arePropsEqual = (prevProps: OrderStatusListProps, nextProps: OrderStatusListProps) => {
  return areOrdersEqual(prevProps.orders, nextProps.orders);
};

function TitledOrderStatusList({ orders, title }: OrderStatusListProps) {
  return (
    <>
      <AppLabel size={22} style={{ fontWeight: 700 }}>
        {title}
      </AppLabel>
      <OrderCardListContainer>
        <CardListContainer>
          {orders.map((order) => {
            if (order.status === OrderStatus.NOT_PAID) {
              return <NotPaidOrderCard key={order.id} order={order} />;
            } else if (order.status === OrderStatus.PAID) {
              return <PaidOrderCard key={order.id} order={order} />;
            } else if (order.status === OrderStatus.SERVED) {
              return <ServedOrderCard key={order.id} order={order} />;
            }
          })}
        </CardListContainer>
      </OrderCardListContainer>
    </>
  );
}

export default memo(TitledOrderStatusList, arePropsEqual);
