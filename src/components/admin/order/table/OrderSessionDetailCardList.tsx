import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAdminOrder from '@hooks/admin/useAdminOrder';
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
  orderSessionId: number;
  serveStatus: string;
}

function OrderSessionDetailCardList({ orderSessionId, serveStatus }: OrderSessionDetailCardListProps) {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { fetchOrderSession } = useAdminOrder(workspaceId);
  const [orderSessionData, setOrderSessionData] = useState<Order[]>([]);

  useEffect(() => {
    fetchOrderSession(orderSessionId).then((res) => setOrderSessionData(res.data));
  }, [orderSessionId]);

  const filteredData = orderSessionData.filter((order) => {
    if (serveStatus === 'ALL') return true;
    return order.status === serveStatus;
  });

  if (filteredData.length === 0) {
    return <FallbackContainer>해당 상태의 주문이 없습니다.</FallbackContainer>;
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
