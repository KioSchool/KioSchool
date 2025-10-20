import { memo } from 'react';
import styled from '@emotion/styled';
import { Order, OrderStatus } from '@@types/index';
import { colFlex, rowFlex } from '@styles/flexStyles';
import AppLabel from '@components/common/label/AppLabel';
import NotPaidOrderCard from './NotPaidOrderCard';
import PaidOrderCard from './PaidOrderCard';
import ServedOrderCard from './ServedOrderCard';
import { areOrdersEquivalent } from '@utils/MemoCompareFunction';
import { RiInformationFill } from '@remixicon/react';

const TitledOrderStatusContainer = styled.div`
  width: 100%;
  font-family: 'LINE Seed Sans KR', sans-serif;
  border: 1px solid #e8eef2;
  border-radius: 16px;
  background: #ffffff50;
  padding: 18px 30px;
  box-sizing: border-box;
  ${colFlex({ align: 'stretch' })}
  gap: 10px;
  box-shadow: 0 4px 20px 0 rgba(92, 92, 92, 0.05) outset;
`;

const TitleWrapper = styled.div`
  width: 100%;
  height: 24px;
  gap: 10px;
  ${rowFlex({ justify: 'flex-start', align: 'center' })}
`;

const OrderCardListContainer = styled.div`
  ${colFlex({ align: 'start' })}
  gap: 8px;
  width: 100%;
  overflow-x: auto;
`;

const CardListContainer = styled.div<{ height?: number }>`
  gap: 8px;
  height: ${(props) => props.height || 200}px;
  ${rowFlex({ align: 'start' })}
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
      return 110;
    case OrderStatus.PAID:
      return 270;
    case OrderStatus.SERVED:
      return 110;
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
    <TitledOrderStatusContainer>
      <TitleWrapper>
        <AppLabel size={16} style={{ fontWeight: 700 }}>
          {title}
        </AppLabel>
        {/* tood: info tag로 뺄 것 */}
        <RiInformationFill size={20} color="#464A4D" />
        <AppLabel size={0}>{description}</AppLabel>
      </TitleWrapper>
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
    </TitledOrderStatusContainer>
  );
}

export default memo(TitledOrderStatusList, arePropsEqual);
