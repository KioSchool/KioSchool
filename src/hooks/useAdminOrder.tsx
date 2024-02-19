import useApi from '@hooks/useApi';
import { Order } from '@@types/index';
import { useSetRecoilState } from 'recoil';
import { ordersAtom } from '@recoils/atoms';

function useAdminOrder(workspaceId: string | undefined) {
  const { adminApi } = useApi();
  const setOrders = useSetRecoilState(ordersAtom);

  const fetchOrders = () => {
    adminApi.get<Order[]>('/orders', { params: { workspaceId } }).then((response) => {
      setOrders(response.data);
    });
  };

  return { fetchOrders };
}

export default useAdminOrder;
