import styled from '@emotion/styled';
import { RiInformationFill } from '@remixicon/react';
import { match } from 'ts-pattern';
import { Order, OrderStatus } from '@@types/index';
import AppTooltip from '@components/common/tooltip/AppToolTip';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import DemoNotPaidOrderCard from './DemoNotPaidOrderCard';
import DemoPaidOrderCard from './DemoPaidOrderCard';
import DemoServedOrderCard from './DemoServedOrderCard';

const LIST_HEIGHT: Record<OrderStatus, number> = {
  [OrderStatus.NOT_PAID]: 110,
  [OrderStatus.PAID]: 260,
  [OrderStatus.SERVED]: 74,
  [OrderStatus.CANCELLED]: 200,
};

const TitledOrderStatusContainer = styled.div`
  width: 100%;
  border: 1px solid ${Color.BORDER_GREY};
  border-radius: 16px;
  background: #ffffff50;
  padding: 18px 30px;
  box-sizing: border-box;
  gap: 10px;
  ${colFlex({ align: 'stretch' })}
`;

const TitleWrapper = styled.div`
  width: 100%;
  height: 24px;
  gap: 10px;
  color: ${Color.TEXT_DEFAULT};
  ${rowFlex({ justify: 'flex-start', align: 'center' })}
`;

const OrderCardListContainer = styled.div`
  gap: 8px;
  width: 100%;
  overflow-x: auto;
  ${colFlex({ align: 'start' })}
`;

const CardListContainer = styled.div<{ listHeight: number }>`
  gap: 8px;
  height: ${({ listHeight }) => listHeight}px;
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
  color: ${Color.TEXT_DEFAULT};
`;

const TitleLabel = styled.div`
  font-size: 16px;
  font-weight: 700;
`;

interface DemoOrderStatusListProps {
  orders: Order[];
  orderStatus: OrderStatus;
  title: string;
  description: string;
}

function DemoOrderStatusList({ orders, orderStatus, title, description }: DemoOrderStatusListProps) {
  return (
    <TitledOrderStatusContainer data-demo-status={orderStatus}>
      <TitleWrapper>
        <TitleLabel>{title}</TitleLabel>
        <AppTooltip content={description}>
          <RiInformationFill />
        </AppTooltip>
      </TitleWrapper>
      <OrderCardListContainer>
        <CardListContainer listHeight={LIST_HEIGHT[orderStatus]}>
          {orders.map((order) =>
            match(order.status)
              .with(OrderStatus.NOT_PAID, () => <DemoNotPaidOrderCard key={order.id} order={order} />)
              .with(OrderStatus.PAID, () => <DemoPaidOrderCard key={order.id} order={order} />)
              .with(OrderStatus.SERVED, () => <DemoServedOrderCard key={order.id} order={order} />)
              .with(OrderStatus.CANCELLED, () => null)
              .exhaustive(),
          )}
          {orders.length === 0 && (
            <EmptyListMessageContainer>
              <MessageLabel>현재 표시할 주문 내역이 없습니다.</MessageLabel>
            </EmptyListMessageContainer>
          )}
        </CardListContainer>
      </OrderCardListContainer>
    </TitledOrderStatusContainer>
  );
}

export default DemoOrderStatusList;
