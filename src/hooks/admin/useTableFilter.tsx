import { useState } from 'react';
import { getTableStatus, TABLE_STATUS, TableStatus } from '@utils/tableStatus';
import { Table } from '@@types/index';

export const TABLE_FILTER = {
  ALL: 'ALL',
  USING: 'USING',
  WARNING: 'WARNING',
  EXCEEDED: 'EXCEEDED',
  EMPTY: 'EMPTY',
} as const;

export type TableFilterType = typeof TABLE_FILTER[keyof typeof TABLE_FILTER];

export type TableFilterCounts = Record<TableFilterType, number>;

const FILTER_TO_STATUS: Partial<Record<TableFilterType, TableStatus>> = {
  [TABLE_FILTER.USING]: TABLE_STATUS.USING,
  [TABLE_FILTER.WARNING]: TABLE_STATUS.WARNING,
  [TABLE_FILTER.EXCEEDED]: TABLE_STATUS.EXCEEDED,
  [TABLE_FILTER.EMPTY]: TABLE_STATUS.EMPTY,
};

function matchesFilter(status: TableStatus, filter: TableFilterType): boolean {
  if (filter === TABLE_FILTER.ALL) return true;
  return status === FILTER_TO_STATUS[filter];
}

export default function useTableFilter(tables: Table[]) {
  const [filterType, setFilterType] = useState<TableFilterType>(TABLE_FILTER.ALL);

  // 상태가 Date.now()에 의존하므로 memo하면 시계 틱에서 카운트가 굳는다
  const statuses = tables.map((table) => ({ table, status: getTableStatus(table) }));

  const counts: TableFilterCounts = {
    [TABLE_FILTER.ALL]: statuses.length,
    [TABLE_FILTER.USING]: statuses.filter(({ status }) => status === TABLE_STATUS.USING).length,
    [TABLE_FILTER.WARNING]: statuses.filter(({ status }) => status === TABLE_STATUS.WARNING).length,
    [TABLE_FILTER.EXCEEDED]: statuses.filter(({ status }) => status === TABLE_STATUS.EXCEEDED).length,
    [TABLE_FILTER.EMPTY]: statuses.filter(({ status }) => status === TABLE_STATUS.EMPTY).length,
  };

  const filteredTables = statuses.filter(({ status }) => matchesFilter(status, filterType)).map(({ table }) => table);

  return { filterType, setFilterType, counts, filteredTables };
}
