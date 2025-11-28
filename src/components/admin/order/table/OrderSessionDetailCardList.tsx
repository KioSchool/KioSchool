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
  serveStatus: string;
}

function OrderSessionDetailCardList({ orderSessionData, serveStatus }: OrderSessionDetailCardListProps) {
  const filteredData = orderSessionData.filter((order) => {
    if (serveStatus === 'ALL') return true;
    return order.status === serveStatus;
  });

  if (filteredData.length === 0) {
    return <FallbackContainer>해당 세션의 주문이 없습니다.</FallbackContainer>;
  }

  return (
    <>
      <Container>
        {filteredData.map((data) => (
          <OrderSessionDetailCard key={data.id} {...data} />
        ))}
      </Container>
    </>
  );
}

export default OrderSessionDetailCardList;
