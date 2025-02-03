import { atom } from 'recoil';
import { EmailDomain, Order, OrderProductBase, PaginationResponse, Product, ProductCategory, User, Workspace } from '@@types/index';
import { defaultPaginationValue } from '@@types/PaginationType';
import { defaultWorkspaceValue } from '@@types/WorkspaceType';
import { defaultUserValue } from '@@types/UserType';
import { defaultUserOrderValue } from '@@types/OrderType';

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

export const adminWorkspaceAtom = atom<Workspace>({
  key: 'adminWorkspaceAtom',
  default: defaultWorkspaceValue,
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
