import useApi from '@hooks/useApi';
import { Order } from '@@types/index';
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

  return { fetchOrder };
}

export default useOrder;
