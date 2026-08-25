import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { colFlex } from '@styles/flexStyles';
import TableOrderCard from '@components/admin/order/table-manage/detail/TableOrderCard/TableOrderCard';
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
  // 건수·합계는 서버의 유효 주문 기준(취소 제외)과 동일하게 계산한다. 카드·목록 집계와 같은 숫자가 나와야 한다.
  const validOrders = orders.filter((order) => order.status !== OrderStatus.CANCELLED);
  const totalOrderAmount = validOrders.reduce((sum, order) => sum + order.totalPrice, 0);

  return (
    <Container>
      <SummaryLabel>
        주문 {validOrders.length}건 · {totalOrderAmount.toLocaleString()}원
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
