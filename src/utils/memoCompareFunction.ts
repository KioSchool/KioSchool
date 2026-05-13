import { Order } from '@@types/index';

export const areOrdersEquivalent = (prevOrder: Order, nextOrder: Order) => {
  if (prevOrder.id !== nextOrder.id) return false;
  if (prevOrder.status !== nextOrder.status) return false;
  if (prevOrder.orderProducts.length !== nextOrder.orderProducts.length) return false;

  return prevOrder.orderProducts.every((prevProduct, index) => prevProduct.servedCount === nextOrder.orderProducts[index].servedCount);
};
