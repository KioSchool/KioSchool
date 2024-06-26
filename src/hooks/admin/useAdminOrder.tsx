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

  const fetchOrders = (props: { startDate: string; endDate: string }) => {
    adminApi.get<Order[]>('/orders', { params: { ...props, workspaceId } }).then((response) => {
      setOrders(response.data);
    });
  };

  const fetchRealTimeOrders = () => {
    adminApi.get<Order[]>('/orders/realtime', { params: { workspaceId } }).then((response) => {
      setOrders(response.data);
    });
  };

  const payOrder = (orderId: number) => {
    adminApi.post<Order>('/order/status', { orderId, workspaceId, status: 'PAID' }).then(() => {
      fetchRealTimeOrders();
    });
  };

  const serveOrder = (orderId: number) => {
    adminApi.post<Order>('/order/status', { orderId, workspaceId, status: 'SERVED' }).then(() => {
      fetchRealTimeOrders();
    });
  };

  const cancelOrder = (orderId: number) => {
    const userInput = confirm('정말로 주문을 취소하시겠습니까?');
    if (!userInput) return;

    adminApi.post<Order>('/order/status', { orderId, workspaceId, status: 'CANCELLED' }).then(() => {
      fetchRealTimeOrders();
    });
  };

  const refundOrder = (orderId: number) => {
    adminApi.post<Order>('/order/status', { orderId, workspaceId, status: 'NOT_PAID' }).then(() => {
      fetchRealTimeOrders();
    });
  };

  const updateOrderProductServe = (orderProductId: number, isServed: boolean) => {
    adminApi.post<Order>('/order/product', { workspaceId, orderProductId, isServed }).then(() => {
      fetchRealTimeOrders();
    });
  };

  return { fetchAllOrders, payOrder, serveOrder, cancelOrder, fetchTodayOrders: fetchRealTimeOrders, fetchOrders, updateOrderProductServe, refundOrder };
}

export default useAdminOrder;
