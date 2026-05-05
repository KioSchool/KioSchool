import { Order } from '@@types/index';
import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { formatKoreanTime } from '@utils/formatDate';
import { colFlex, rowFlex } from '@styles/flexStyles';
import RefreshSpinIcon from '@components/common/refresh/RefreshSpinIcon';
import OrderRowItem from './OrderRowItem';

const Container = styled.div`
  border: 1px solid #ececec;
  border-radius: 10px;
  overflow: hidden;
  ${colFlex({ justify: 'start', align: 'center' })}
  height: 100%;
`;

const Header = styled.div`
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  padding: 5px 10px;
  color: ${Color.GREY};
  background-color: #f0f5f8;
  font-size: 15px;
  font-weight: 600;
  border-bottom: 1px solid #ececec;
  ${colFlex({ justify: 'center', align: 'center' })};
`;

const RefreshSection = styled.div`
  position: absolute;
  left: 10px;
  ${rowFlex({ align: 'center' })};
  gap: 10px;
`;

const NowTimeLabel = styled.div``;

const HeaderTitle = styled.div`
  text-align: center;
`;

const OrderListContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  ${colFlex()};
`;

const OrderHeader = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 1.2fr 1.8fr 1fr 1fr 1fr 0.5fr;
  padding: 10px;
  background-color: #f0f5f8;
  border-bottom: 1px solid #ececec;
  text-align: center;
  font-size: 15px;
  font-weight: 600;
`;

const OrderItem = styled.div`
  overflow-y: auto;
  flex-grow: 1;
`;

const OrderFallback = styled.div`
  height: 100%;
  color: ${Color.GREY};
  font-size: 20px;
  font-weight: 600;
  ${colFlex({ justify: 'center', align: 'center' })};
`;

const HeaderCell = styled.div`
  color: ${Color.GREY};
`;

interface TableOrderListProps {
  orders: Order[];
  onRefresh: () => void;
  isLoading: boolean;
}

const formattedNowTime = formatKoreanTime(new Date().toISOString()) || '시간 없음';

function AdminTableOrderList({ orders, onRefresh, isLoading }: TableOrderListProps) {
  return (
    <Container>
      <Header>
        <RefreshSection>
          <NowTimeLabel>{formattedNowTime}</NowTimeLabel>
          <RefreshSpinIcon isLoading={isLoading} onClick={onRefresh} size={20} color={Color.GREY} />
        </RefreshSection>
        <HeaderTitle>주문 내역</HeaderTitle>
      </Header>
      <OrderListContainer>
        <OrderHeader>
          <HeaderCell>번호</HeaderCell>
          <HeaderCell>시간</HeaderCell>
          <HeaderCell>상품명</HeaderCell>
          <HeaderCell>입금자명</HeaderCell>
          <HeaderCell>금액</HeaderCell>
          <HeaderCell>주문상태</HeaderCell>
          <HeaderCell>보기</HeaderCell>
        </OrderHeader>
        <OrderItem>
          {orders.length > 0 ? orders.map((order: Order) => <OrderRowItem key={order.id} order={order} />) : <OrderFallback>주문 없음</OrderFallback>}
        </OrderItem>
      </OrderListContainer>
    </Container>
  );
}

export default AdminTableOrderList;
