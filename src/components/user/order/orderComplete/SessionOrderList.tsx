import styled from '@emotion/styled';
import { Order, OrderStatus } from '@@types/index';
import { colFlex, rowFlex } from '@styles/flexStyles';
import SessionOrderCard from './SessionOrderCard';

const MIN_ORDER_COUNT_TO_SHOW = 2;

const Container = styled.div`
  box-sizing: border-box;
  width: 100%;
  gap: 15px;
  ${colFlex()}
`;

const SubTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  padding-left: 10px;
`;

const OrderCardContainer = styled.div`
  width: 100%;
  gap: 10px;
  ${colFlex()}
`;

const TotalRow = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 0 20px;
  ${rowFlex({ justify: 'space-between', align: 'center' })}
`;

const TotalText = styled.div`
  font-size: 14px;
  font-weight: 600;
`;

interface SessionOrderListProps {
  orders: Order[];
  currentOrderId: number;
}

function SessionOrderList({ orders, currentOrderId }: SessionOrderListProps) {
  if (orders.length < MIN_ORDER_COUNT_TO_SHOW) return null;

  const latestFirstOrders = [...orders].sort((a, b) => b.id - a.id);
  const totalPrice = orders.filter((order) => order.status !== OrderStatus.CANCELLED).reduce((sum, order) => sum + order.totalPrice, 0);

  return (
    <Container>
      <SubTitle>테이블 주문 내역 {orders.length}건</SubTitle>
      <OrderCardContainer>
        {latestFirstOrders.map((order) => (
          <SessionOrderCard key={order.id} order={order} isCurrent={order.id === currentOrderId} />
        ))}
      </OrderCardContainer>
      {totalPrice > 0 && (
        <TotalRow>
          <TotalText>합계</TotalText>
          <TotalText>{totalPrice.toLocaleString()}원</TotalText>
        </TotalRow>
      )}
    </Container>
  );
}

export default SessionOrderList;
