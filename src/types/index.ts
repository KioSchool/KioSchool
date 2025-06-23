export interface Order {
  tableNumber: number;
  phoneNumber: string;
  customerName: string;
  orderProducts: Array<OrderProduct>;
  totalPrice: number;
  status: OrderStatus;
  cancelReason: string;
  orderNumber: number;
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface OrderProductBase {
  productId: number;
  quantity: number;
  productPrice: number;
}

export interface OrderWebsocket {
  type: 'CREATED' | 'UPDATED';
  data: Order;
}

export interface OrderProduct extends OrderProductBase {
  productName: string;
  isServed: boolean;
  servedCount: number;
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
  id: number;
  name: string;
  index: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface ProductAddedImage extends Product {
  image: {};
}
export type ProductEdit = Omit<ProductAddedImage, 'createdAt' | 'updatedAt' | 'imageUrl'>;

export interface ProductStateType {
  name: string;
  description: string;
  price: number;
  productId?: string;
  workspaceId: string | undefined;
  productCategoryId: string;
}

export interface ProductActionType {
  type: string;
  payload: any;
}

export interface Workspace {
  name: string;
  description: string;
  owner: User;
  products: Array<Product>;
  productCategories: Array<ProductCategory>;
  images: Array<WorkspaceImage>;
  notice: string;
  tableCount: number;
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface WorkspaceImage {
  url: string;
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
  account: Account | null;
  accountUrl: string;
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface Account {
  bank: Bank;
  accountNumber: string;
  accountHolder: string;
  tossAccountUrl: string;
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface Bank {
  name: string;
  code: string;
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface EmailDomain {
  name: string;
  domain: string;
  id: number;
  createdAt: string;
  updatedAt: string;
}
