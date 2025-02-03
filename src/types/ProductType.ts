import { OrderProduct, OrderProductBase, Product } from '.';
import { defaultCategoryValue } from './CategoryType';

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
