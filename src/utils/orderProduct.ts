import { OrderProduct } from '@@types/index';

export function formatProductSummary(orderProducts: OrderProduct[] | undefined): string {
  if (!orderProducts || orderProducts.length === 0) return '상품 없음';
  if (orderProducts.length === 1) return orderProducts[0].productName;

  return `${orderProducts[0].productName} 외 ${orderProducts.length - 1}건`;
}
