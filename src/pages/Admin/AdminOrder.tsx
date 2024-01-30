import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useOrdersWebsocket from '../../hooks/useOrdersWebsocket';
import { useRecoilValue } from 'recoil';
import { ordersAtom } from '../../recoils/atoms';
import OrderListContainer from '../../components/order/OrderListContainer';

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
