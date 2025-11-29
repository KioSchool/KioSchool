import { Order } from '@@types/index';
import OrderSessionDetailCard from './OrderSessionDetailCard';
import styled from '@emotion/styled';

const Container = styled.div`
  max-height: 350px;
  overflow-y: auto;
`;

const FallbackContainer = styled.div`
  padding: 20px;
  text-align: center;
  color: #888;
`;

interface OrderSessionDetailCardListProps {
  orderSessionData: Order[];
  orderStatus: string;
}

function OrderSessionDetailCardList({ orderSessionData, orderStatus }: OrderSessionDetailCardListProps) {
  const filteredData = orderSessionData.filter((order) => orderStatus === 'ALL' || order.status === orderStatus);

  if (filteredData.length === 0) {
    return <FallbackContainer>해당 세션에 주문이 없습니다.</FallbackContainer>;
  }

  return (
    <Container>
      {filteredData.map((data) => (
        <OrderSessionDetailCard key={data.id} {...data} />
      ))}
    </Container>
  );
}

export default OrderSessionDetailCardList;
