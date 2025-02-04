import { Order, OrderProduct, OrderProductBase, OrderStatus, PaginationResponse, Product, ProductCategory, User, UserRole, Workspace, WorkspaceImage } from '.';

export const defaultCategoryValue: ProductCategory = {
  id: 0,
  name: '',
  index: null,
  createdAt: '',
  updatedAt: '',
};

export const defaultImageValue: WorkspaceImage = {
  url: '',
  id: 0,
  createdAt: '',
  updatedAt: '',
};

export const defaultOrderProductBaseValue: OrderProductBase = {
  productId: 0,
  quantity: 0,
};

export const defaultOrderProductValue: OrderProduct = {
  ...defaultOrderProductBaseValue,
  productName: '',
  productPrice: 0,
  isServed: false,
  servedCount: 0,
  totalPrice: 0,
  id: 0,
  createdAt: '',
  updatedAt: '',
};

export const defaultUserOrderValue: Order = {
  tableNumber: 0,
  phoneNumber: '',
  customerName: '',
  orderProducts: [defaultOrderProductValue],
  totalPrice: 0,
  status: OrderStatus.NOT_PAID,
  cancelReason: '',
  id: 0,
  createdAt: '',
  updatedAt: '',
};

export const defaultPaginationValue: PaginationResponse<any> = {
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
};

export const defaultProductValue: Product = {
  name: '',
  description: '',
  price: 0,
  isSellable: null,
  imageUrl: '',
  id: 0,
  createdAt: '',
  updatedAt: '',
  productCategory: defaultCategoryValue,
};

export const defaultUserValue: User = {
  name: '',
  email: '',
  role: UserRole.ADMIN,
  accountUrl: '',
  id: 0,
  createdAt: '',
  updatedAt: '',
};

export const defaultWorkspaceValue: Workspace = {
  name: '',
  description: '',
  owner: defaultUserValue,
  products: [defaultProductValue],
  productCategories: [defaultCategoryValue],
  images: [defaultImageValue],
  notice: '',
  tableCount: 0,
  id: 0,
  createdAt: '',
  updatedAt: '',
};
