import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useOrdersWebsocket from '../../hook/useOrdersWebsocket';
import { useRecoilValue } from 'recoil';
import { ordersAtom } from '../../recoil/atoms';
import OrderListContainer from '../../component/order/OrderListContainer';

function AdminOrder() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { subscribeOrders, fetchOrders } = useOrdersWebsocket(workspaceId);
  const orders = useRecoilValue(ordersAtom);

  useEffect(() => {
    subscribeOrders();
    fetchOrders();
  }, []);

  return <OrderListContainer orders={orders} />;
}

export default AdminOrder;
