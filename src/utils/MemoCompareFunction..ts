import { Order } from '@@types/index';

export const areOrderInfoEqual = (prevOrder: Order, nextOrder: Order) => {
  const isSameOrderId = prevOrder.id === nextOrder.id;
  const hasSameStatus = prevOrder.status === nextOrder.status;
  const hasSameProductsLength = prevOrder.orderProducts.length === nextOrder.orderProducts.length;

  const areAllServedCountsEqual = prevOrder.orderProducts.every((prevProduct, index) => {
    const nextProduct = nextOrder.orderProducts[index];
    return prevProduct.servedCount === nextProduct.servedCount;
  });

  return isSameOrderId && hasSameStatus && hasSameProductsLength && areAllServedCountsEqual;
};
