import React, { memo } from 'react';
import styled from '@emotion/styled';
import OrderCardList from './OrderCardList';
import { Order } from '@@types/index';
import { colFlex } from '@styles/flexStyles';
import AppLabel from '@components/common/label/AppLabel';
import { Color } from '@resources/colors';

const OrderStatusListContainer = styled.div`
  ${colFlex({ align: 'start' })}
  gap: 10px;
  width: 100%;
  overflow-x: auto;
`;

interface OrderStatusListProps {
  filteredOrders: Order[];
  title: string;
}

function areOrdersEqual(prevOrders: Order[], nextOrders: Order[]) {
  if (prevOrders.length !== nextOrders.length) return false;

  return prevOrders.every((prevOrder, index) => {
    const nextOrder = nextOrders[index];
    return (
      prevOrder.id === nextOrder.id &&
      prevOrder.orderProducts.every((prevProduct, productIndex) => {
        const nextProduct = nextOrder.orderProducts[productIndex];
        return prevProduct.isServed === nextProduct.isServed && prevProduct.servedCount === nextProduct.servedCount;
      })
    );
  });
}

const arePropsEqual = (prevProps: OrderStatusListProps, nextProps: OrderStatusListProps) => {
  return areOrdersEqual(prevProps.filteredOrders, nextProps.filteredOrders);
};

function OrderStatusList({ filteredOrders, title }: OrderStatusListProps) {
  return (
    <>
      <AppLabel color={Color.BLACK} size={22} style={{ fontWeight: 700 }}>
        {title}
      </AppLabel>
      <OrderStatusListContainer>
        <OrderCardList filteredOrders={filteredOrders} />
      </OrderStatusListContainer>
    </>
  );
}

export default memo(OrderStatusList, arePropsEqual);
