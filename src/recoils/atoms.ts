import { atom } from 'recoil';
import { Order, OrderProductBase, OrderStatus, PaginationResponse, Product, ProductCategory, User, UserRole, Workspace } from '@@types/index';

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

export const workspacePaginationResponseAtom = atom<PaginationResponse<Workspace>>({
  key: 'workspacePaginationResponseAtom',
  default: {
    content: [],
    pageable: {
      pageNumber: 0,
      pageSize: 6,
      sort: {
        sorted: false,
        empty: true,
        unsorted: true,
      },
      offset: 0,
      paged: true,
      unpaged: false,
    },
    totalPages: 0,
    totalElements: 0,
    last: false,
    number: 0,
    size: 6,
    numberOfElements: 0,
    sort: {
      sorted: false,
      empty: true,
      unsorted: true,
    },
    first: true,
    empty: true,
  },
});

export const userPaginationResponseAtom = atom<PaginationResponse<User>>({
  key: 'userPaginationResponseAtom',
  default: {
    content: [],
    pageable: {
      pageNumber: 0,
      pageSize: 6,
      sort: {
        sorted: false,
        empty: true,
        unsorted: true,
      },
      offset: 0,
      paged: true,
      unpaged: false,
    },
    totalPages: 0,
    totalElements: 0,
    last: false,
    number: 0,
    size: 6,
    numberOfElements: 0,
    sort: {
      sorted: false,
      empty: true,
      unsorted: true,
    },
    first: true,
    empty: true,
  },
});
