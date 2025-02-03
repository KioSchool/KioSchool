import { Order, OrderStatus } from '.';
import { defaultOrderProductValue } from './ProductType';

export const defaultUserOrderValue: Order = {
  tableNumber: 0,
  phoneNumber: '',
  customerName: '',
  orderProducts: [defaultOrderProductValue],
  totalPrice: 0,
  status: OrderStatus.NOT_PAID,
  cancelReason: '',
  id: 0,
  createdAt: '',
  updatedAt: '',
};
