import React, { memo } from 'react';
import styled from '@emotion/styled';
import { Order } from '@@types/index';
import { colFlex, rowFlex } from '@styles/flexStyles';
import AppLabel from '@components/common/label/AppLabel';
import { Color } from '@resources/colors';
import OrderCard from './OrderCard';

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

    const hasSameOrderId = prevOrder.id === nextOrder.id;

    const areProductsEqual = prevOrder.orderProducts.every((prevProduct, productIndex) => {
      const nextProduct = nextOrder.orderProducts[productIndex];
      const hasSameServedStatus = prevProduct.isServed === nextProduct.isServed;
      const hasSameServedCount = prevProduct.servedCount === nextProduct.servedCount;
      return hasSameServedStatus && hasSameServedCount;
    });

    return hasSameOrderId && areProductsEqual;
  });
}

const arePropsEqual = (prevProps: OrderStatusListProps, nextProps: OrderStatusListProps) => {
  return areOrdersEqual(prevProps.orders, nextProps.orders);
};

function TitledOrderStatusList({ orders, title }: OrderStatusListProps) {
  return (
    <>
      <AppLabel color={Color.BLACK} size={22} style={{ fontWeight: 700 }}>
        {title}
      </AppLabel>
      <OrderCardListContainer>
        <CardListContainer>
          {orders.map((order) => {
            return <OrderCard key={order.id} order={order} />;
          })}
        </CardListContainer>
      </OrderCardListContainer>
    </>
  );
}

export default memo(TitledOrderStatusList, arePropsEqual);
