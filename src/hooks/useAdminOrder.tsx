import useApi from '@hooks/useApi';
import { Order } from '@@types/index';
import { useSetRecoilState } from 'recoil';
import { ordersAtom } from '@recoils/atoms';

function useAdminOrder(workspaceId: string | undefined) {
  const { adminApi } = useApi();
  const setOrders = useSetRecoilState(ordersAtom);

  const fetchAllOrders = () => {
    adminApi.get<Order[]>('/orders', { params: { workspaceId } }).then((response) => {
      setOrders(response.data);
    });
  };

  const fetchOrders = (params: any) => {
    adminApi.get<Order[]>('/orders', { params: { ...params, workspaceId } }).then((response) => {
      setOrders(response.data);
    });
  };

  const fetchRealTimeOrders = () => {
    adminApi.get<Order[]>('/orders/realtime', { params: { workspaceId } }).then((response) => {
      setOrders(response.data);
    });
  };

  const payOrder = (orderId: number) => {
    adminApi.post<Order>('/order/pay', { orderId: orderId, workspaceId: Number(workspaceId) }).then(() => {
      fetchRealTimeOrders();
    });
  };

  const serveOrder = (orderId: number) => {
    adminApi.post<Order>('/order/serve', { orderId: orderId, workspaceId: Number(workspaceId) }).then(() => {
      fetchRealTimeOrders();
    });
  };

  const cancelOrder = (orderId: number) => {
    adminApi.post<Order>('/order/cancel', { orderId: orderId, workspaceId: Number(workspaceId) }).then(() => {
      fetchRealTimeOrders();
    });
  };

  return { fetchAllOrders, payOrder, serveOrder, cancelOrder, fetchTodayOrders: fetchRealTimeOrders, fetchOrders };
}

export default useAdminOrder;
