import useApi from '@hooks/useApi';
import { Order, OrderStatus, PaginationResponse, Table } from '@@types/index';
import { useSetRecoilState } from 'recoil';
import { ordersAtom, tablePaginationResponseAtom } from '@recoils/atoms';
import { useSearchParams } from 'react-router-dom';

function useAdminOrder(workspaceId: string | undefined) {
  const { adminApi } = useApi();
  const setOrders = useSetRecoilState(ordersAtom);
  const setTablePaginationResponse = useSetRecoilState(tablePaginationResponseAtom);
  const [searchParams, setSearchParams] = useSearchParams();

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
    adminApi.post<Order>('/order/status', { orderId, workspaceId, status: OrderStatus.PAID }).then(() => {
      fetchRealTimeOrders();
    });
  };

  const serveOrder = (orderId: number) => {
    adminApi.post<Order>('/order/status', { orderId, workspaceId, status: OrderStatus.SERVED }).then(() => {
      fetchRealTimeOrders();
    });
  };

  const cancelOrder = (orderId: number) => {
    const userInput = confirm('정말로 주문을 취소하시겠습니까?');
    if (!userInput) return;

    adminApi.post<Order>('/order/status', { orderId, workspaceId, status: OrderStatus.CANCELLED }).then(() => {
      fetchRealTimeOrders();
    });
  };

  const refundOrder = (orderId: number) => {
    adminApi.post<Order>('/order/status', { orderId, workspaceId, status: OrderStatus.NOT_PAID }).then(() => {
      fetchRealTimeOrders();
    });
  };

  const updateOrderProductServe = (orderProductId: number, isServed: boolean) => {
    adminApi.post<Order>('/order/product', { workspaceId, orderProductId, isServed }).then(() => {
      fetchRealTimeOrders();
    });
  };

  const fetchWorkspaceTable = (tableNumber: number, page: number, size: number) => {
    const params = { workspaceId, tableNumber, page, size };

    adminApi.get<PaginationResponse<Table>>('/orders/table', { params }).then((res) => {
      setTablePaginationResponse(res.data);
      searchParams.set('page', params.page.toString());
      setSearchParams(searchParams);
    });
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
  };
}

export default useAdminOrder;
