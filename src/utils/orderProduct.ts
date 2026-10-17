import { OrderProduct } from '@@types/index';

export function formatProductSummary(orderProducts: OrderProduct[] | undefined): string {
  if (!orderProducts || orderProducts.length === 0) return '상품 없음';
  if (orderProducts.length === 1) return orderProducts[0].productName;

  return `${orderProducts[0].productName} 외 ${orderProducts.length - 1}건`;
}

// 다 내보낸 줄은 취소선으로 끝났음을 보여주므로 0 대신 시킨 개수를 둔다
export function getDisplayedQuantity(orderProduct: OrderProduct): number {
  if (orderProduct.isServed) return orderProduct.quantity;
  return orderProduct.quantity - orderProduct.servedCount;
}
