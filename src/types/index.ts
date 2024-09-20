export interface Order {
  tableNumber: number;
  phoneNumber: string;
  customerName: string;
  orderProducts: Array<OrderProduct>;
  totalPrice: number;
  status: OrderStatus;
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface OrderProductBase {
  productId: number;
  quantity: number;
}

export interface OrderProduct extends OrderProductBase {
  productId: number;
  productName: string;
  productPrice: number;
  isServed: boolean;
  totalPrice: number;
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  name: string;
  description: string;
  price: number;
  isSellable: boolean | null;
  imageUrl: string;
  id: number;
  createdAt: string;
  updatedAt: string;
  productCategory: ProductCategory;
}

export interface ProductCategory {
  id: number | string;
  name: string;
  index: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface Workspace {
  name: string;
  description: string;
  owner: User;
  products: Array<Product>;
  productCategories: Array<ProductCategory>;
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface Sort {
  sorted: boolean;
  empty: boolean;
  unsorted: boolean;
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface PaginationResponse<T> {
  content: T[];
  pageable: Pageable;
  totalPages: number;
  totalElements: number;
  last: boolean;
  number: number;
  size: number;
  numberOfElements: number;
  sort: Sort;
  first: boolean;
  empty: boolean;
}

export enum OrderStatus {
  PAID = 'PAID',
  SERVED = 'SERVED',
  CANCELLED = 'CANCELLED',
  NOT_PAID = 'NOT_PAID',
}

export enum UserRole {
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN',
}

export interface User {
  name: string;
  email: string;
  role: UserRole;
  accountUrl: string;
  id: number;
  createdAt: string;
  updatedAt: string;
}
