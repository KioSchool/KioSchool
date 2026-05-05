import { OrderStatus } from '@@types/index';
import { Color } from '@resources/colors';

export const STATUS_LABELS: Record<OrderStatus, string> = {
  NOT_PAID: '미결제',
  PAID: '결제완료',
  SERVED: '서빙완료',
  CANCELLED: '취소',
};

export const STATUS_PALETTE: Record<OrderStatus, { dot: string; text: string }> = {
  NOT_PAID: { dot: Color.KIO_ORANGE, text: Color.BLACK },
  PAID: { dot: Color.BLACK, text: Color.BLACK },
  SERVED: { dot: Color.GREY, text: Color.GREY },
  CANCELLED: { dot: Color.HEAVY_GREY, text: Color.HEAVY_GREY },
};

export const ORDER_STATUSES: OrderStatus[] = [OrderStatus.NOT_PAID, OrderStatus.PAID, OrderStatus.SERVED, OrderStatus.CANCELLED];
