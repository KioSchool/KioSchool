import { Order } from '@@types/index';
import { atom } from 'jotai';

export const ordersAtom = atom<Order[]>([]);
