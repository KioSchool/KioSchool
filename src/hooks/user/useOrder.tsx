import useApi from '@hooks/useApi';
import { Order, OrderProductBase } from '@@types/index';
import { useSetRecoilState } from 'recoil';
import { userOrderAtom } from '@recoils/atoms';

function useOrder() {
  const { userApi } = useApi();
  const setOrder = useSetRecoilState(userOrderAtom);

  const fetchOrder = (orderId: string | null) => {
    userApi.get<Order>('/order', { params: { orderId: orderId } }).then((response) => {
      setOrder(response.data);
    });
  };

  const createOrder = (workspaceId: string | null, tableNumber: string | null, orderProducts: OrderProductBase[], customerName: string) => {
    return userApi.post<Order>('/order', {
      workspaceId,
      tableNumber,
      orderProducts,
      customerName,
    });
  };

  return { fetchOrder, createOrder };
}

export default useOrder;
