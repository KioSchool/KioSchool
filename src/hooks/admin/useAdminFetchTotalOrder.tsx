import { useState, useEffect, useMemo, useCallback } from 'react';
import useAdminOrder from '@hooks/admin/useAdminOrder';
import { Order } from '@@types/index';
import { dateConverter } from '@utils/formatDate';
import { useAdminFetchOrderBase } from './useAdminFetchOrderBase';

export const useAdminFetchTotalOrder = (workspaceId: string | undefined) => {
  const { fetchOrders } = useAdminOrder(workspaceId);

  const { baseFilters, setBaseFilters, resetBaseFilters, tableOptions, sortOptions, statusOptions } = useAdminFetchOrderBase(workspaceId);
  const { startDate, endDate, tableNumber, sortOrder, orderStatuses } = baseFilters;
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  useEffect(() => {
    if (!startDate || !endDate) return;

    const start = dateConverter(startDate);
    const end = dateConverter(endDate);
    const tableNo = tableNumber === 'ALL' ? undefined : Number(tableNumber);

    const statusParams = orderStatuses.length > 0 ? orderStatuses : undefined;

    fetchOrders({
      startDate: start,
      endDate: end,
      tableNumber: tableNo,
      statuses: statusParams,
    })
      .then((res) => setOrders(res.data))
      .catch(console.error);
  }, [startDate, endDate, tableNumber, orderStatuses, workspaceId]);

  const processedOrders = useMemo(() => {
    let result = [...orders];

    if (searchKeyword.trim() !== '') {
      result = result.filter((order) => String(order.orderNumber).includes(searchKeyword) || order.customerName.includes(searchKeyword));
    }

    return result.sort((a, b) => {
      const timeA = new Date(a.createdAt).getTime();
      const timeB = new Date(b.createdAt).getTime();
      return sortOrder === 'LATEST' ? timeB - timeA : timeA - timeB;
    });
  }, [orders, sortOrder, searchKeyword]);

  const handleReset = useCallback(() => {
    resetBaseFilters();
    setSearchKeyword('');
  }, [resetBaseFilters]);

  return {
    data: processedOrders,
    tableOptions,
    sortOptions,
    statusOptions,
    filters: {
      ...baseFilters,
      searchKeyword,
    },
    setFilters: {
      ...setBaseFilters,
      setSearchKeyword,
    },
    handleReset,
  };
};
