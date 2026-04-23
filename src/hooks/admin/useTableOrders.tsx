import { Order } from '@@types/index';
import useAdminOrder from '@hooks/admin/useAdminOrder';
import { useCallback, useEffect, useState } from 'react';

const AUTO_REFRESH_INTERVAL = 60000;

export default function useTableOrders(workspaceId: string | undefined, orderSessionId: number | undefined) {
  const { fetchOrderSession } = useAdminOrder(String(workspaceId));
  const [orders, setOrders] = useState<Order[]>([]);

  const fetchOrders = useCallback(() => {
    if (orderSessionId) {
      fetchOrderSession(orderSessionId)
        .then((response) => setOrders(response.data))
        .catch((error) => console.error('테이블 주문을 가져오는 중 오류 발생:', error));
    } else {
      setOrders([]);
    }
  }, [orderSessionId]);

  useEffect(() => {
    fetchOrders();
    const intervalId = setInterval(fetchOrders, AUTO_REFRESH_INTERVAL);
    return () => clearInterval(intervalId);
  }, [fetchOrders]);

  const totalOrderAmount = orders.reduce((sum, order) => sum + order.totalPrice, 0);

  return { orders, totalOrderAmount, fetchOrders };
}
