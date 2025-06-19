import { Order, Product, Workspace } from '@@types/index';
import { atom } from 'jotai';

export const ordersAtom = atom<Order[]>([]);
export const workspacesAtom = atom<Workspace[]>([]);
export const productsAtom = atom<Product[]>([]);
