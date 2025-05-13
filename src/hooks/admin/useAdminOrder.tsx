import useApi from '@hooks/useApi';
import { Order, OrderStatus, PaginationResponse } from '@@types/index';
import { useSetRecoilState } from 'recoil';
import { ordersAtom, tableOrderPaginationResponseAtom } from '@recoils/atoms';
import { defaultPaginationValue } from '@@types/defaultValues';
import { ApiPoint } from '@components/admin/order/OrderPriceStatistics';

function useAdminOrder(workspaceId: string | undefined) {
  const { adminApi } = useApi();
  const setOrders = useSetRecoilState(ordersAtom);
  const setTablePaginationResponse = useSetRecoilState(tableOrderPaginationResponseAtom);

  const fetchAllOrders = () => {
    adminApi.get<Order[]>('/orders', { params: { workspaceId } }).then((response) => {
      setOrders(response.data);
    });
  };

  const fetchOrders = (props: { startDate: string; endDate: string; status?: OrderStatus }) => {
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

  const updateOrderProductServe = (orderProductId: number, isServed: boolean) => {
    adminApi.post<Order>('/order/product', { workspaceId, orderProductId, isServed }).catch((error) => {
      console.log(error);
    });
  };

  const fetchWorkspaceTable = (tableNumber: number, page: number, size: number) => {
    const params = { workspaceId, tableNumber, page, size };

    const response = adminApi
      .get<PaginationResponse<Order>>('/orders/table', { params })
      .then((res) => {
        setTablePaginationResponse(res.data);
        return res.data;
      })
      .catch((error) => {
        console.log(error);
        return defaultPaginationValue;
      });

    return response;
  };

  const updateOrderProductCount = (orderProductId: number, servedCount: number) => {
    adminApi.put('/order/product', { workspaceId, orderProductId, servedCount }).catch((error) => {
      console.log(error);
    });
  };

  const fetchPrefixSumOrders = (startDate: string, endDate: string, status?: OrderStatus) => {
    const response = adminApi.get<ApiPoint[]>('/orders/prefix-sum/price', { params: { workspaceId, startDate, endDate, status } }).catch((error) => {
      console.log(error);
    });
    return response;
  };

  return {
    fetchAllOrders,
    payOrder,
    serveOrder,
    cancelOrder,
    fetchTodayOrders: fetchRealTimeOrders,
    fetchOrders,
    updateOrderProductServe,
    refundOrder,
    fetchWorkspaceTable,
    updateOrderProductCount,
    fetchPrefixSumOrders,
  };
}

export default useAdminOrder;
