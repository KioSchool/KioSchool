import { OrderStatus } from '@@types/index';

export const orderStatusConverter = (status: OrderStatus) => {
  switch (status) {
    case OrderStatus.PAID:
      return '결제 완료';
    case OrderStatus.NOT_PAID:
      return '주문 완료';
    case OrderStatus.SERVED:
      return '서빙 완료';
    case OrderStatus.CANCELLED:
      return '주문 취소';
    default:
      return '알 수 없음';
  }
};
