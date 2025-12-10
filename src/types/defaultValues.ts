import {
  Account,
  Bank,
  Order,
  OrderProduct,
  OrderProductBase,
  OrderStatus,
  PaginationResponse,
  Product,
  ProductCategory,
  ProductEdit,
  ProductStatus,
  User,
  UserRole,
  Workspace,
  WorkspaceImage,
  WorkspaceSetting,
} from '.';

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
  productPrice: 0,
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
  orderNumber: 0,
  orderSession: null,
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
  status: ProductStatus.SELLING,
  imageUrl: '',
  id: 0,
  createdAt: '',
  updatedAt: '',
  productCategory: defaultCategoryValue,
};

export const defaultProductEditValue: ProductEdit = {
  name: '',
  description: '',
  price: 0,
  id: 0,
  status: ProductStatus.SELLING,
  image: {
    url: '',
    file: null,
  },
  productCategory: {
    id: 0,
    name: '',
    index: 0,
    createdAt: '',
    updatedAt: '',
  },
};

export const defaultBankValue: Bank = {
  name: '',
  code: '',
  id: 0,
  createdAt: '',
  updatedAt: '',
};

export const defaultBanksValue: Bank[] = [
  {
    name: '',
    code: '',
    id: 0,
    createdAt: '',
    updatedAt: '',
  },
];

export const defaultAccountValue: Account = {
  bank: defaultBankValue,
  accountNumber: '',
  accountHolder: '',
  tossAccountUrl: '',
  id: 0,
  createdAt: '',
  updatedAt: '',
};

export const defaultUserValue: User = {
  name: '',
  email: '',
  role: UserRole.ADMIN,
  account: defaultAccountValue,
  accountUrl: '',
  id: 0,
  createdAt: '',
  updatedAt: '',
};

export const defaultWorkspaceSetting: WorkspaceSetting = {
  useOrderSessionTimeLimit: false,
  orderSessionTimeLimitMinutes: 0,
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
  workspaceSetting: defaultWorkspaceSetting,
  id: 0,
  createdAt: '',
  updatedAt: '',
};
