import { OrdersFilter, OrderStatus } from '@@types/index';
import { ORDER_STATUSES } from '@constants/data/orderStatus';

export const EMPTY_ORDERS_FILTER: OrdersFilter = {
  workspaceId: '',
  statuses: [],
  startDate: '',
  endDate: '',
};

const STATUS_SET = new Set<OrderStatus>(ORDER_STATUSES);

function isOrderStatus(value: string): value is OrderStatus {
  return STATUS_SET.has(value as OrderStatus);
}

export function parseOrdersFilterFromParams(params: URLSearchParams): OrdersFilter {
  const statuses = params.getAll('status').filter(isOrderStatus);
  return {
    workspaceId: params.get('workspaceId') ?? '',
    statuses,
    startDate: params.get('startDate') ?? '',
    endDate: params.get('endDate') ?? '',
  };
}

export function serializeOrdersFilterToParams(filter: OrdersFilter): URLSearchParams {
  const next = new URLSearchParams();
  if (filter.workspaceId) next.set('workspaceId', filter.workspaceId);
  if (filter.startDate) next.set('startDate', filter.startDate);
  if (filter.endDate) next.set('endDate', filter.endDate);
  filter.statuses.forEach((s) => next.append('status', s));
  return next;
}

export interface OrdersFetchSlice {
  workspaceId?: number;
  status?: OrderStatus[];
  startDate?: string;
  endDate?: string;
}

export function toFetchParams(filter: OrdersFilter): OrdersFetchSlice {
  const slice: OrdersFetchSlice = {};
  if (filter.workspaceId) slice.workspaceId = Number(filter.workspaceId);
  if (filter.statuses.length > 0) slice.status = filter.statuses;
  if (filter.startDate) slice.startDate = filter.startDate;
  if (filter.endDate) slice.endDate = filter.endDate;
  return slice;
}
