export interface Order {
  tableNumber: number;
  phoneNumber: string;
  customerName: string;
  orderProducts: Array<OrderProduct>;
  totalPrice: number;
  status: string;
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface OrderProductBase {
  productId: number;
  quantity: number;
}

export interface OrderProduct extends OrderProductBase {
  product: Product;
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
  imageUrl: string;
  id: number;
  createdAt: string;
  updatedAt: string;
  productCategory: ProductCategory;
}

export interface ProductCategory {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface Workspace {
  name: string;
  owner: User;
  products: Array<Product>;
  productCategories: Array<ProductCategory>;
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  name: string;
  email: string;
  role: string;
  accountUrl: string;
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductStateType {
  name: string;
  description: string;
  price: number;
  workspaceId: string | undefined;
  productCategoryId: string;
}

export interface ProductActionType {
  type: string;
  payload: any;
}
