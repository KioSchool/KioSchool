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
    adminApi.get<Order[]>('/orders', { params }).then((response) => {
      setOrders(response.data);
    });
  };

  const fetchTodayOrders = () => {
    fetchOrders({ startDate: new Date().toISOString().split('T')[0], endDate: new Date().toISOString().split('T')[0], workspaceId });
  };

  const payOrder = (orderId: number) => {
    adminApi.post<Order>('/order/pay', { orderId: orderId, workspaceId: Number(workspaceId) }).then(() => {
      fetchTodayOrders();
    });
  };

  const serveOrder = (orderId: number) => {
    adminApi.post<Order>('/order/serve', { orderId: orderId, workspaceId: Number(workspaceId) }).then(() => {
      fetchTodayOrders();
    });
  };

  const cancelOrder = (orderId: number) => {
    adminApi.post<Order>('/order/cancel', { orderId: orderId, workspaceId: Number(workspaceId) }).then(() => {
      fetchTodayOrders();
    });
  };

  return { fetchAllOrders, payOrder, serveOrder, cancelOrder, fetchTodayOrders };
}

export default useAdminOrder;
