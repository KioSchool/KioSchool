import useApi from '@hooks/useApi';
import { Order, OrderProductBase, PaymentMethod } from '@@types/index';
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

  // 테이블 사용이 끝났거나 orderId가 현재 세션 소속이 아니면 서버가 빈 배열을 준다
  const fetchSessionOrders = (workspaceId: string | null, tableHash: string | null, orderId: string | null) => {
    if (!workspaceId || !tableHash || !orderId) return Promise.resolve<Order[]>([]);

    return userApi
      .get<Order[]>('/order/session-orders', { params: { workspaceId, tableHash, orderId } })
      .then((response) => response.data)
      .catch(() => []);
  };

  const createOrder = (
    workspaceId: string | null,
    tableHash: string | null,
    orderProducts: OrderProductBase[],
    customerName: string,
    paymentMethod?: PaymentMethod,
  ) => {
    return userApi
      .post<Order>('/order', {
        workspaceId,
        tableHash,
        orderProducts,
        customerName,
        paymentMethod,
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

  // 확인에 실패하면 주문을 막지 않는다. 최종 판단은 POST /order가 한다
  const checkOrderAvailable = (workspaceId: string | null, tableNo: string | null) => {
    if (!workspaceId || !tableNo) return Promise.resolve(true);

    return userApi
      .get<boolean>('/order/available', { params: { workspaceId, tableNumber: tableNo } })
      .then((response) => response.data)
      .catch(() => true);
  };

  return { fetchOrder, fetchSessionOrders, createOrder, checkOrderAvailable };
}

export default useOrder;
