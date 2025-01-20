import { OrderStatus } from '@@types/index';
import useAdminOrder from '@hooks/admin/useAdminOrder';
import useOrdersWebsocket from '@hooks/user/useOrdersWebsocket';
import { ordersAtom } from '@recoils/atoms';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import OrderCard from './OrderCard';
import styled from '@emotion/styled';
import { rowFlex } from '@styles/flexStyles';

const CardListContainer = styled.div`
  ${rowFlex()}
  gap: 10px;
`;

interface OrderCardListProps {
  orderStatus: OrderStatus;
}

function OrderCardList({ orderStatus }: OrderCardListProps) {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { subscribeOrders } = useOrdersWebsocket(workspaceId);
  const { fetchTodayOrders } = useAdminOrder(workspaceId);

  const orders = useRecoilValue(ordersAtom);

  useEffect(() => {
    subscribeOrders();
    fetchTodayOrders();
  }, []);

  const filteredOrders = orders.filter((it) => it.status === orderStatus);

  return (
    <CardListContainer>
      {filteredOrders.map((order) => {
        return <OrderCard orderInfo={order} />;
      })}
    </CardListContainer>
  );
}

export default OrderCardList;
