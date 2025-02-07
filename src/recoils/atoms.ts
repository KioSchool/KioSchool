import { atom } from 'recoil';
import { EmailDomain, Order, OrderProductBase, PaginationResponse, Product, ProductCategory, User, Workspace } from '@@types/index';
import { defaultPaginationValue, defaultWorkspaceValue, defaultUserValue, defaultUserOrderValue } from '@@types/defaultValues';
import { recoilPersist } from 'recoil-persist';

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

export const categoriesAtom = atom<ProductCategory[]>({
  key: 'categoriesAtom',
  default: [],
});

const { persistAtom } = recoilPersist({
  key: 'workspace-atom',
  storage: localStorage,
});

export const adminWorkspaceAtom = atom<Workspace>({
  key: 'adminWorkspaceAtom',
  default: defaultWorkspaceValue,
  effects_UNSTABLE: [persistAtom],
});

export const userWorkspaceAtom = atom<Workspace>({
  key: 'userWorkspaceAtom',
  default: defaultWorkspaceValue,
});

export const adminUserAtom = atom<User>({
  key: 'adminUserAtom',
  default: defaultUserValue,
});

export const userOrderAtom = atom<Order>({
  key: 'userOrderAtom',
  default: defaultUserOrderValue,
});

export const orderBasketAtom = atom<OrderProductBase[]>({
  key: 'orderBasketAtom',
  default: [],
});

export const isLoadingAtom = atom<boolean>({
  key: 'isLoadingAtom',
  default: false,
});

export const emailDomainPaginationResponseAtom = atom<PaginationResponse<EmailDomain>>({
  key: 'emailDomainPaginationResponseAtom',
  default: defaultPaginationValue,
});

export const tableOrderPaginationResponseAtom = atom<PaginationResponse<Order>>({
  key: 'tableOrderPaginationResponseAtom',
  default: defaultPaginationValue,
});
