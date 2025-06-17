import { memo } from 'react';
import styled from '@emotion/styled';
import { Order, OrderStatus } from '@@types/index';
import { colFlex, rowFlex } from '@styles/flexStyles';
import AppLabel from '@components/common/label/AppLabel';
import NotPaidOrderCard from './NotPaidOrderCard';
import PaidOrderCard from './PaidOrderCard';
import ServedOrderCard from './ServedOrderCard';
import { areOrdersEquivalent } from '@utils/MemoCompareFunction';

const TitleContainer = styled.div`
  width: 100%;
  height: 40px;
  border-radius: 10px;
  background: #ececec;
  padding: 0 20px;
  ${rowFlex({ justify: 'space-between', align: 'center' })}
`;

const OrderCardListContainer = styled.div`
  ${colFlex({ align: 'start' })}
  gap: 10px;
  width: 100%;
  overflow-x: auto;
`;

const CardListContainer = styled.div<{ height?: number }>`
  ${rowFlex()}
  gap: 10px;
  height: ${(props) => props.height || 200}px;
`;

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

const getOrderContainerHeight = (status: OrderStatus) => {
  switch (status) {
    case OrderStatus.NOT_PAID:
      return 120;
    case OrderStatus.PAID:
      return 280;
    case OrderStatus.SERVED:
      return 120;
    default:
      return 200;
  }
};

interface OrderStatusListProps {
  orders: Order[];
  orderStatus: OrderStatus;
  title: string;
  description: string;
}

function TitledOrderStatusList({ orders, orderStatus, title, description }: OrderStatusListProps) {
  return (
    <>
      <TitleContainer>
        <AppLabel size={20} style={{ fontWeight: 700 }}>
          {title}
        </AppLabel>
        <AppLabel size={14}>{description}</AppLabel>
      </TitleContainer>
      <OrderCardListContainer>
        <CardListContainer height={getOrderContainerHeight(orderStatus)}>
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
