import { Order, OrderStatus } from '@@types/index';

export function getSessionOrderTotalPrice(orders: Order[]): number {
  return orders.filter((order) => order.status !== OrderStatus.CANCELLED).reduce((sum, order) => sum + order.totalPrice, 0);
}
