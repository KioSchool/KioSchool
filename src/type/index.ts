export interface Order {
  tableNumber: number;
  phoneNumber: string;
  orderProducts: Array<OrderProduct>;
  totalPrice: number;
  status: string;
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface OrderProduct {
  product: Product;
  quantity: number;
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
}

export interface Workspace {
  name: string;
  owner: User;
  products: Array<Product>;
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
