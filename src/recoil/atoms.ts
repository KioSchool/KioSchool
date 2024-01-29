import { atom } from 'recoil';
import { Order, OrderProductBase, Product, Workspace } from '../type';

export const ordersAtom = atom<Order[]>({
  key: 'ordersAtom',
  default: [],
});

export const workspacesAtom = atom<Workspace[]>({
  key: 'workspacesAtom',
  default: [],
});

export const productsAtom = atom<Product[]>({
  key: 'productsAtom',
  default: [],
});

export const userWorkspaceAtom = atom<Workspace>({
  key: 'userWorkspaceAtom',
  default: {
    name: '',
    owner: {
      name: '',
      email: '',
      role: '',
      accountUrl: '',
      id: 0,
      createdAt: '',
      updatedAt: '',
    },
    products: [],
    productCategories: [],
    id: 0,
    createdAt: '',
    updatedAt: '',
  },
});

export const orderBasketAtom = atom<OrderProductBase[]>({
  key: 'orderBasketAtom',
  default: [],
});

export const isLoadingAtom = atom<boolean>({
  key: 'isLoadingAtom',
  default: false,
});
