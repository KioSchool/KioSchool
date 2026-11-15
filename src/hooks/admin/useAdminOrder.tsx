import useApi from '@hooks/useApi';
import { Order, OrderStatus, OrderSessionWithOrder } from '@@types/index';
import { useSetAtom } from 'jotai';
import { adminOrdersAtom } from '@jotai/admin/atoms';
import { notifyActionFailure } from '@utils/actionFailure';

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
  const changeOrderStatus = (orderId: number, status: OrderStatus, failureMessage: string) =>
    adminApi
      .post<Order>('/order/status', { orderId, workspaceId, status })
      .then(() => true)
      .catch((error) => {
        notifyActionFailure(error, failureMessage);
        return false;
      });

  const payOrder = (orderId: number) => changeOrderStatus(orderId, OrderStatus.PAID, '결제 완료로 바꾸지 못했습니다. 잠시 후 다시 시도해 주세요.');

  const serveOrder = (orderId: number) => changeOrderStatus(orderId, OrderStatus.SERVED, '서빙 완료로 바꾸지 못했습니다. 잠시 후 다시 시도해 주세요.');

  const cancelOrder = (orderId: number) => {
    const userInput = confirm('정말로 주문을 취소하시겠습니까?');
    if (!userInput) return;

    changeOrderStatus(orderId, OrderStatus.CANCELLED, '주문을 취소하지 못했습니다. 잠시 후 다시 시도해 주세요.');
  };

  const refundOrder = (orderId: number) =>
    changeOrderStatus(orderId, OrderStatus.NOT_PAID, '결제 완료를 되돌리지 못했습니다. 주문 상세에서 다시 시도해 주세요.');

  const updateOrderProductCount = (orderProductId: number, servedCount: number) => {
    adminApi.put('/order/product', { workspaceId, orderProductId, servedCount }).catch((error) => {
      notifyActionFailure(error, '서빙 수량을 바꾸지 못했습니다. 잠시 후 다시 시도해 주세요.');
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
