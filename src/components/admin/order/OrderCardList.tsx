import { OrderStatus } from '@@types/index';
import useAdminOrder from '@hooks/admin/useAdminOrder';
import useOrdersWebsocket from '@hooks/user/useOrdersWebsocket';
import { ordersAtom } from '@recoils/atoms';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import OrderCard from './OrderCard';

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
    <div>
      {notPaidOrders.map((order) => {
        return <OrderCard orderInfo={order} />;
      })}
    </div>
  );
}

export default OrderCardList;
