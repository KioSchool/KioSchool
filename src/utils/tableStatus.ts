import { Table } from '@@types/index';

export const TABLE_STATUS = {
  EXCEEDED: 'EXCEEDED',
  WARNING: 'WARNING',
  USING: 'USING',
  EMPTY: 'EMPTY',
} as const;

export type TableStatus = typeof TABLE_STATUS[keyof typeof TABLE_STATUS];

const MINUTES_TO_WARN = 10;
const MS_PER_MINUTE = 60 * 1000;
export const WARNING_THRESHOLD_MS = MINUTES_TO_WARN * MS_PER_MINUTE;

export const STATUS_ORDER: Record<TableStatus, number> = {
  [TABLE_STATUS.EXCEEDED]: 0,
  [TABLE_STATUS.WARNING]: 1,
  [TABLE_STATUS.USING]: 2,
  [TABLE_STATUS.EMPTY]: 3,
};

export function getTableStatus(table: Table): TableStatus {
  if (!table.orderSession) return TABLE_STATUS.EMPTY;

  const { expectedEndAt } = table.orderSession;
  if (!expectedEndAt) return TABLE_STATUS.USING;

  const remaining = new Date(expectedEndAt).getTime() - Date.now();
  if (remaining <= 0) return TABLE_STATUS.EXCEEDED;
  if (remaining <= WARNING_THRESHOLD_MS) return TABLE_STATUS.WARNING;

  return TABLE_STATUS.USING;
}
