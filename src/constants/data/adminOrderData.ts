import { OrderStatus } from '@@types/index';

export const TABLE_ORDER_STATUS_OPTIONS: { value: OrderStatus; label: string }[] = [
  { value: OrderStatus.SERVED, label: '서빙 완료' },
  { value: OrderStatus.PAID, label: '결제 완료' },
  { value: OrderStatus.NOT_PAID, label: '주문 완료' },
];

export const TABLE_ORDER_SORT_OPTIONS = [
  { value: 'LATEST', label: '최신순' },
  { value: 'OLDEST', label: '오래된순' },
];
