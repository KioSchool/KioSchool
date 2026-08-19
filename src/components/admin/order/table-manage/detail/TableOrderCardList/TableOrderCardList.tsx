import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { colFlex } from '@styles/flexStyles';
import TableOrderCard from '@components/admin/order/table-manage/detail/TableOrderCard/TableOrderCard';
import { Order } from '@@types/index';

const Container = styled.div`
  width: 100%;
  gap: 8px;
  ${colFlex()};
`;

const SummaryLabel = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: ${Color.GREY};
`;

const CardList = styled.div`
  width: 100%;
  gap: 8px;
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
  totalOrderAmount: number;
}

function TableOrderCardList({ orders, totalOrderAmount }: TableOrderCardListProps) {
  return (
    <Container>
      <SummaryLabel>
        주문 {orders.length}건 · {totalOrderAmount.toLocaleString()}원
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
