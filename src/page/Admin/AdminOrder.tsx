import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useOrdersWebsocket from '../../hook/useOrdersWebsocket';

function AdminOrder() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { subscribeOrders, fetchOrders } = useOrdersWebsocket(workspaceId);

  useEffect(() => {
    subscribeOrders();
    fetchOrders();
  }, []);

  return <div>AdminOrder</div>;
}

export default AdminOrder;
