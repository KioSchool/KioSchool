import useApi from '@hooks/useApi';
import { Order, OrderStatus, OrderSessionWithOrder } from '@@types/index';
import { useSetAtom } from 'jotai';
import { adminOrdersAtom } from '@jotai/admin/atoms';

interface FetchOrdersParams {
  workspaceId: number;
  startDate: string;
  endDate: string;
  tableNumber?: number;
  statuses?: OrderStatus[];
}

function useAdminOrder(workspaceId: string | undefined) {
  const { adminApi } = useApi();
  const setOrders = useSetAtom(adminOrdersAtom);

  const fetchAllOrders = () => {
    adminApi.get<Order[]>('/orders', { params: { workspaceId } }).then((response) => {
      setOrders(response.data);
    });
  };

  const fetchOrders = (params: Omit<FetchOrdersParams, 'workspaceId'>) => {
    return adminApi
      .get<Order[]>('/orders', {
        params: {
          ...params,
          workspaceId: workspaceId,
          statuses: params.statuses?.join(','),
        },
      })
      .then((response) => {
        setOrders(response.data);
        return response;
      });
  };

  const fetchRealTimeOrders = () => {
    adminApi.get<Order[]>('/orders/realtime', { params: { workspaceId } }).then((response) => {
      setOrders(response.data);
    });
  };

  // 성공 여부를 돌려준다. 결제 확인 토스트와 되돌리기는 서버가 받아들인 뒤에만 띄워야 한다
  const payOrder = (orderId: number) =>
    adminApi
      .post<Order>('/order/status', { orderId, workspaceId, status: OrderStatus.PAID })
      .then(() => true)
      .catch((error) => {
        console.log(error);
        return false;
      });

  const serveOrder = (orderId: number) => {
    adminApi.post<Order>('/order/status', { orderId, workspaceId, status: OrderStatus.SERVED }).catch((error) => {
      console.log(error);
    });
  };

  const cancelOrder = (orderId: number) => {
    const userInput = confirm('정말로 주문을 취소하시겠습니까?');
    if (!userInput) return;

    adminApi.post<Order>('/order/status', { orderId, workspaceId, status: OrderStatus.CANCELLED }).catch((error) => {
      console.log(error);
    });
  };

  const refundOrder = (orderId: number) =>
    adminApi
      .post<Order>('/order/status', { orderId, workspaceId, status: OrderStatus.NOT_PAID })
      .then(() => true)
      .catch((error) => {
        console.log(error);
        return false;
      });

  const updateOrderProductCount = (orderProductId: number, servedCount: number) => {
    adminApi.put('/order/product', { workspaceId, orderProductId, servedCount }).catch((error) => {
      console.log(error);
    });
  };

  const fetchOrderSession = (orderSessionId: number) => {
    return adminApi.get<Order[]>('/order/session', { params: { workspaceId, orderSessionId } });
  };

  const fetchOrderSessions = (props: { targetDate: string; includeGhost?: boolean }) => {
    return adminApi.get<OrderSessionWithOrder[]>('/orders/sessions', { params: { ...props, workspaceId } });
  };

  return {
    fetchAllOrders,
    payOrder,
    serveOrder,
    cancelOrder,
    fetchTodayOrders: fetchRealTimeOrders,
    fetchOrders,
    refundOrder,
    updateOrderProductCount,
    fetchOrderSession,
    fetchOrderSessions,
  };
}

export default useAdminOrder;
