import useApi from '@hooks/useApi';
import { Order, OrderStatus, TableOrderSession } from '@@types/index';
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

  const payOrder = (orderId: number) => {
    adminApi.post<Order>('/order/status', { orderId, workspaceId, status: OrderStatus.PAID }).catch((error) => {
      console.log(error);
    });
  };

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

  const refundOrder = (orderId: number) => {
    adminApi.post<Order>('/order/status', { orderId, workspaceId, status: OrderStatus.NOT_PAID }).catch((error) => {
      console.log(error);
    });
  };

  const updateOrderProductCount = (orderProductId: number, servedCount: number) => {
    adminApi.put('/order/product', { workspaceId, orderProductId, servedCount }).catch((error) => {
      console.log(error);
    });
  };

  const fetchOrderHourlyPrices = (props: { startDate: string; endDate: string; status?: OrderStatus }) => {
    const response = adminApi.get('/orders/hourly/price', { params: { ...props, workspaceId } }).catch((error) => {
      console.log(error);
    });
    return response;
  };

  const fetchOrderSession = (orderSessionId: number) => {
    return adminApi.get<Order[]>('/order/session', { params: { workspaceId, orderSessionId } });
  };

  const fetchTableOrderSessions = (props: { startDate: string; endDate: string; tableNumber?: number }) => {
    return adminApi.get<TableOrderSession[]>('/orders/table', { params: { ...props, workspaceId } });
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
    fetchOrderHourlyPrices,
    fetchOrderSession,
    fetchTableOrderSessions,
  };
}

export default useAdminOrder;
