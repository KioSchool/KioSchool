import useApi from '@hooks/useApi';
import { Order, OrderProductBase } from '@@types/index';
import { defaultUserOrderValue } from '@@types/defaultValues';

function useOrder() {
  const { userApi } = useApi();

  const fetchOrder = (orderId: string | null) => {
    return userApi
      .get<Order>('/order', { params: { orderId } })
      .then((response) => response.data)
      .catch(() => defaultUserOrderValue);
  };

  const createOrder = (workspaceId: string | null, tableHash: string | null, orderProducts: OrderProductBase[], customerName: string) => {
    return userApi.post<Order>('/order', {
      workspaceId,
      tableHash,
      orderProducts,
      customerName,
    });
  };

  return { fetchOrder, createOrder };
}

export default useOrder;
