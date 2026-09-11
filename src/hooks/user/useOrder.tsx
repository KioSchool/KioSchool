import useApi from '@hooks/useApi';
import { Order, OrderProductBase } from '@@types/index';
import { defaultUserOrderValue } from '@@types/defaultValues';
import { trackEvent } from '@utils/analytics';
import { GA_CURRENCY, GA_EVENT } from '@constants/analytics';
import { orderResponseToGaItems } from '@utils/orderBasket';

function useOrder() {
  const { userApi } = useApi();

  const fetchOrder = (orderId: string | null) => {
    return userApi
      .get<Order>('/order', { params: { orderId } })
      .then((response) => response.data)
      .catch(() => defaultUserOrderValue);
  };

  const createOrder = (workspaceId: string | null, tableHash: string | null, orderProducts: OrderProductBase[], customerName: string) => {
    return userApi
      .post<Order>('/order', {
        workspaceId,
        tableHash,
        orderProducts,
        customerName,
      })
      .then((response) => {
        trackEvent(GA_EVENT.PURCHASE, {
          transaction_id: String(response.data.id),
          value: response.data.totalPrice,
          currency: GA_CURRENCY,
          items: orderResponseToGaItems(response.data.orderProducts),
        });

        return response;
      });
  };

  return { fetchOrder, createOrder };
}

export default useOrder;
