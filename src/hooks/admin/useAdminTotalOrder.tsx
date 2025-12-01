import { useEffect, useState, useMemo } from 'react';
import { TABLE_ORDER_SORT_OPTIONS, TABLE_ORDER_STATUS_OPTIONS } from '@constants/data/adminOrderData';
import useAdminOrder from '@hooks/admin/useAdminOrder';
import useAdminWorkspace from '@hooks/admin/useAdminWorkspace';
import { Order, OrderStatus, Table } from '@@types/index';
import { subHours } from 'date-fns';
import { dateConverter } from '@utils/FormatDate';

export const useAdminTotalOrder = (workspaceId: string | undefined) => {
  const { fetchOrders } = useAdminOrder(workspaceId);
  const { fetchWorkspaceTables } = useAdminWorkspace();

  const [orders, setOrders] = useState<Order[]>([]);
  const [tables, setTables] = useState<Table[]>([]);

  const [startDate, setStartDate] = useState<Date | null>(subHours(new Date(), 2));
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [tableNumber, setTableNumber] = useState<string>('ALL');
  const [orderStatus, setOrderStatus] = useState<OrderStatus | 'ALL'>('ALL');
  const [sortOrder, setSortOrder] = useState<string>('LATEST');
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  useEffect(() => {
    if (workspaceId) {
      fetchWorkspaceTables(workspaceId).then((res) => setTables(res.data));
    }
  }, [workspaceId]);

  useEffect(() => {
    if (startDate && endDate) {
      const start = dateConverter(startDate);
      const end = dateConverter(endDate);
      const tableNo = tableNumber === 'ALL' ? undefined : Number(tableNumber);

      fetchOrders({
        startDate: start,
        endDate: end,
        tableNumber: tableNo,
        status: orderStatus,
      })
        .then((res) => {
          setOrders(res.data);
        })
        .catch(console.error);
    }
  }, [startDate, endDate, tableNumber, orderStatus, workspaceId]);

  const filteredAndSortedOrders = useMemo(() => {
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

  const tableOptions = useMemo(
    () => [{ value: 'ALL', label: '전체 테이블' }, ...tables.map((table) => ({ value: String(table.tableNumber), label: `${table.tableNumber}번 테이블` }))],
    [tables],
  );

  const handleReset = () => {
    setStartDate(subHours(new Date(), 2));
    setEndDate(new Date());
    setTableNumber('ALL');
    setOrderStatus('ALL');
    setSortOrder('LATEST');
    setSearchKeyword('');
  };

  return {
    tables,
    orders: filteredAndSortedOrders,
    totalFilters: {
      startDate,
      endDate,
      tableNumber,
      orderStatus,
      sortOrder,
      searchKeyword,
    },
    setTotalFilters: {
      setStartDate,
      setEndDate,
      setTableNumber,
      setOrderStatus,
      setSortOrder,
      setSearchKeyword,
    },
    handleReset,
    tableOptions,
    statusOptions: TABLE_ORDER_STATUS_OPTIONS,
    sortOptions: TABLE_ORDER_SORT_OPTIONS,
  };
};
