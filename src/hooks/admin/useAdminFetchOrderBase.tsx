import { useCallback, useEffect, useMemo, useState } from 'react';
import { subHours } from 'date-fns';
import { useAtomValue } from 'jotai';
import { adminTablesAtom } from '@jotai/admin/atoms';
import useAdminWorkspace from '@hooks/admin/useAdminWorkspace';
import { OrderStatus } from '@@types/index';
import { TABLE_ORDER_SORT_OPTIONS, TABLE_ORDER_STATUS_OPTIONS } from '@constants/data/adminOrderData';

export const useAdminFetchOrderBase = (workspaceId: string | undefined) => {
  const { fetchWorkspaceTables } = useAdminWorkspace();

  const tables = useAtomValue(adminTablesAtom);
  const [startDate, setStartDate] = useState<Date | null>(subHours(new Date(), 2));
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [tableNumber, setTableNumber] = useState<string>('ALL');
  const [sortOrder, setSortOrder] = useState<string>('LATEST');
  const [orderStatuses, setOrderStatuses] = useState<OrderStatus[]>([]);

  useEffect(() => {
    if (workspaceId) {
      fetchWorkspaceTables(workspaceId);
    }
  }, [workspaceId]);

  const tableOptions = useMemo(
    () => [
      { value: 'ALL', label: '전체 테이블' },
      ...tables.map((table) => ({
        value: String(table.tableNumber),
        label: `${table.tableNumber}번 테이블`,
      })),
    ],
    [tables],
  );

  const resetBaseFilters = useCallback(() => {
    setStartDate(subHours(new Date(), 2));
    setEndDate(new Date());
    setTableNumber('ALL');
    setSortOrder('LATEST');
    setOrderStatuses([]);
  }, []);

  return {
    tables,
    tableOptions,
    sortOptions: TABLE_ORDER_SORT_OPTIONS,
    statusOptions: TABLE_ORDER_STATUS_OPTIONS,
    baseFilters: {
      startDate,
      endDate,
      tableNumber,
      sortOrder,
      orderStatuses,
    },
    setBaseFilters: {
      setStartDate,
      setEndDate,
      setTableNumber,
      setSortOrder,
      setOrderStatuses,
    },
    resetBaseFilters,
  };
};
