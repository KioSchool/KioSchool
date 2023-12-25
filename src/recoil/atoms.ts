import { atom } from 'recoil';
import { Order } from '../type';

export const ordersAtom = atom<Order[]>({
  key: 'ordersAtom',
  default: [],
});
