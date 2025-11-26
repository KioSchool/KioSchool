import { OrderStatus } from '@@types/index';

export const TABLE_ORDER_STATUS_OPTIONS = [
  { value: 'ALL', label: '전체 주문 상태' },
  { value: OrderStatus.SERVED, label: '서빙완료' },
  { value: OrderStatus.PAID, label: '결제완료' },
  { value: OrderStatus.NOT_PAID, label: '미결제' },
];

export const TABLE_ORDER_SORT_OPTIONS = [
  { value: 'LATEST', label: '최신순' },
  { value: 'OLDEST', label: '오래된순' },
];
