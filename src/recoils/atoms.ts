import { atom } from 'recoil';
import { EmailDomain, Order, OrderProductBase, OrderStatus, PaginationResponse, Product, ProductCategory, User, UserRole, Workspace } from '@@types/index';
import { defaultPaginationValue } from '@@types/PaginationType';

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
  default: {
    name: '',
    description: '',
    owner: {
      name: '',
      email: '',
      role: UserRole.ADMIN,
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
    tableCount: 0,
  },
});

export const userWorkspaceAtom = atom<Workspace>({
  key: 'userWorkspaceAtom',
  default: {
    name: '',
    description: '',
    owner: {
      name: '',
      email: '',
      role: UserRole.ADMIN,
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
    tableCount: 0,
  },
});

export const adminUserAtom = atom<User>({
  key: 'adminUserAtom',
  default: {
    name: '',
    email: '',
    role: UserRole.ADMIN,
    accountUrl: '',
    id: 0,
    createdAt: '',
    updatedAt: '',
  },
});

export const userOrderAtom = atom<Order>({
  key: 'userOrderAtom',
  default: {
    tableNumber: 0,
    phoneNumber: '',
    customerName: '',
    orderProducts: [],
    totalPrice: 0,
    cancelReason: '',
    status: OrderStatus.NOT_PAID,
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

export const emailDomainPaginationResponseAtom = atom<PaginationResponse<EmailDomain>>({
  key: 'emailDomainPaginationResponseAtom',
  default: defaultPaginationValue,
});

export const tableOrderPaginationResponseAtom = atom<PaginationResponse<Order>>({
  key: 'tableOrderPaginationResponseAtom',
  default: defaultPaginationValue,
});
