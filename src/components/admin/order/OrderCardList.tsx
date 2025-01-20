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
  width: 100%;
  ${rowFlex()}
`;

function OrderCardList() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { subscribeOrders } = useOrdersWebsocket(workspaceId);
  const { fetchTodayOrders } = useAdminOrder(workspaceId);

  const orders = useRecoilValue(ordersAtom);

  useEffect(() => {
    subscribeOrders();
    fetchTodayOrders();
  }, []);

  const notPaidOrders = orders.filter((it) => it.status === OrderStatus.NOT_PAID);

  return (
    <CardListContainer>
      {notPaidOrders.map((order) => {
        return <OrderCard orderInfo={order} />;
      })}
    </CardListContainer>
  );
}

export default OrderCardList;
