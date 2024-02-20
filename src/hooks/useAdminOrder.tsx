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

  const payOrder = (orderId: number) => {
    adminApi.post<Order>('/order/pay', { orderId: orderId, workspaceId: Number(workspaceId) }).then(() => {
      fetchAllOrders();
    });
  };

  const serveOrder = (orderId: number) => {
    adminApi.post<Order>('/order/serve', { orderId: orderId, workspaceId: Number(workspaceId) }).then(() => {
      fetchAllOrders();
    });
  };

  const cancelOrder = (orderId: number) => {
    adminApi.post<Order>('/order/cancel', { orderId: orderId, workspaceId: Number(workspaceId) }).then(() => {
      fetchAllOrders();
    });
  };

  return { fetchAllOrders, payOrder, serveOrder, cancelOrder };
}

export default useAdminOrder;
