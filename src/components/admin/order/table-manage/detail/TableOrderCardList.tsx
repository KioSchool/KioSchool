import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { colFlex } from '@styles/flexStyles';
import TableOrderCard from './TableOrderCard';
import { Order, OrderStatus } from '@@types/index';

const Container = styled.div`
  width: 100%;
  gap: 6px;
  ${colFlex()};
`;

const SummaryLabel = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: ${Color.MUTED_GREY};
`;

const CardList = styled.div`
  width: 100%;
  ${colFlex()};
`;

const EmptyLabel = styled.div`
  width: 100%;
  padding: 24px 0;
  font-size: 13px;
  color: ${Color.GREY};
  text-align: center;
`;

interface TableOrderCardListProps {
  orders: Order[];
}

function TableOrderCardList({ orders }: TableOrderCardListProps) {
  const countedOrders = orders.filter((order) => order.status !== OrderStatus.CANCELLED);
  const totalOrderAmount = countedOrders.reduce((sum, order) => sum + order.totalPrice, 0);

  return (
    <Container>
      <SummaryLabel>
        주문 {countedOrders.length}건 · {totalOrderAmount.toLocaleString()}원
      </SummaryLabel>
      {orders.length > 0 ? (
        <CardList>
          {orders.map((order) => (
            <TableOrderCard key={order.id} order={order} />
          ))}
        </CardList>
      ) : (
        <EmptyLabel>주문 내역이 없습니다.</EmptyLabel>
      )}
    </Container>
  );
}

export default TableOrderCardList;
