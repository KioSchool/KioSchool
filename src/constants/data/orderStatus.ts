import { OrderStatus } from '@@types/index';
import { Color } from '@resources/colors';

export const STATUS_LABELS: Record<OrderStatus, string> = {
  NOT_PAID: '미결제',
  PAID: '결제완료',
  SERVED: '서빙완료',
  CANCELLED: '취소',
};

export const STATUS_PALETTE: Record<OrderStatus, { bg: string; text: string; lineThrough?: boolean }> = {
  NOT_PAID: { bg: Color.LIGHT_RED, text: Color.RED },
  PAID: { bg: Color.KIO_ORANGE_FAINT, text: Color.KIO_ORANGE_DARK },
  SERVED: { bg: Color.GREEN_FAINT, text: Color.GREEN },
  CANCELLED: { bg: '#F0F0F0', text: Color.GREY, lineThrough: true },
};

export const ORDER_STATUSES: OrderStatus[] = [OrderStatus.NOT_PAID, OrderStatus.PAID, OrderStatus.SERVED, OrderStatus.CANCELLED];
