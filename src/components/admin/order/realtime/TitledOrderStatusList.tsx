import { memo } from 'react';
import styled from '@emotion/styled';
import { Order, OrderStatus } from '@@types/index';
import { colFlex, rowFlex } from '@styles/flexStyles';
import NotPaidOrderCard from './NotPaidOrderCard';
import PaidOrderCard from './PaidOrderCard';
import ServedOrderCard from './ServedOrderCard';
import { areOrdersEquivalent } from '@utils/memoCompareFunction';
import { RiInformationFill } from '@remixicon/react';
import AppTooltip from '@components/common/tooltip/AppToolTip';

const TitledOrderStatusContainer = styled.div`
  width: 100%;
  border: 1px solid #e8eef2;
  border-radius: 16px;
  background: #ffffff50;
  padding: 18px 30px;
  box-sizing: border-box;
  gap: 10px;
  box-shadow: 0 4px 20px 0 rgba(92, 92, 92, 0.05) outset;
  ${colFlex({ align: 'stretch' })}
`;

const TitleWrapper = styled.div`
  width: 100%;
  height: 24px;
  gap: 10px;
  color: #464a4d;
  ${rowFlex({ justify: 'flex-start', align: 'center' })}
`;

const OrderCardListContainer = styled.div`
  gap: 8px;
  width: 100%;
  overflow-x: auto;
  ${colFlex({ align: 'start' })}
`;

const CardListContainer = styled.div<{ height?: number }>`
  gap: 8px;
  height: ${(props) => props.height || 200}px;
  width: 100%;
  ${rowFlex({ align: 'start' })}
`;

const EmptyListMessageContainer = styled.div`
  width: 100%;
  height: 100%;
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

const MessageLabel = styled.div`
  font-size: 16px;
  color: #464a4d;
`;

const TitleLabel = styled.div`
  font-size: 16px;
  font-weight: 700;
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
      return 260;
    case OrderStatus.SERVED:
      return 74;
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
  let orderListContent: React.ReactNode;

  if (orders.length > 0) {
    orderListContent = orders.map((order) => {
      if (order.status === OrderStatus.NOT_PAID) {
        return <NotPaidOrderCard key={order.id} order={order} />;
      } else if (order.status === OrderStatus.PAID) {
        return <PaidOrderCard key={order.id} order={order} />;
      } else if (order.status === OrderStatus.SERVED) {
        return <ServedOrderCard key={order.id} order={order} />;
      }
    });
  } else {
    orderListContent = (
      <EmptyListMessageContainer>
        <MessageLabel>현재 표시할 주문 내역이 없습니다.</MessageLabel>
      </EmptyListMessageContainer>
    );
  }

  return (
    <TitledOrderStatusContainer>
      <TitleWrapper>
        <TitleLabel>{title}</TitleLabel>
        <AppTooltip content={description}>
          <RiInformationFill />
        </AppTooltip>
      </TitleWrapper>
      <OrderCardListContainer>
        <CardListContainer height={getOrderContainerHeight(orderStatus)}>{orderListContent}</CardListContainer>
      </OrderCardListContainer>
    </TitledOrderStatusContainer>
  );
}

export default memo(TitledOrderStatusList, arePropsEqual);
