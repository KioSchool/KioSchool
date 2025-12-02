import { useState, useEffect, useMemo } from 'react';
import useAdminOrder from '@hooks/admin/useAdminOrder';
import { TableOrderSession } from '@@types/index';
import { dateConverter } from '@utils/FormatDate';
import { useAdminFetchOrderBase } from './useAdminFetchOrderBase';

export const useAdminFetchTableOrder = (workspaceId: string | undefined) => {
  const { fetchTableOrderSessions } = useAdminOrder(workspaceId);

  const { baseFilters, setBaseFilters, resetBaseFilters, tableOptions, sortOptions, statusOptions } = useAdminFetchOrderBase(workspaceId);
  const { startDate, endDate, tableNumber, sortOrder } = baseFilters;
  const [sessions, setSessions] = useState<TableOrderSession[]>([]);

  useEffect(() => {
    if (!startDate || !endDate) return;

    const start = dateConverter(startDate);
    const end = dateConverter(endDate);
    const tableNo = tableNumber === 'ALL' ? undefined : Number(tableNumber);

    fetchTableOrderSessions({
      startDate: start,
      endDate: end,
      tableNumber: tableNo,
    })
      .then((res) => setSessions(res.data))
      .catch(console.error);
  }, [startDate, endDate, tableNumber, workspaceId]);

  const sortedSessions = useMemo(() => {
    return [...sessions].sort((a, b) => {
      const timeA = new Date(a.createdAt).getTime();
      const timeB = new Date(b.createdAt).getTime();
      return sortOrder === 'LATEST' ? timeB - timeA : timeA - timeB;
    });
  }, [sessions, sortOrder]);

  return {
    data: sortedSessions,
    tableOptions,
    sortOptions,
    statusOptions,
    filters: baseFilters,
    setFilters: setBaseFilters,
    handleReset: resetBaseFilters,
  };
};
