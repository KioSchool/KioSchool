import { useEffect, useState, useMemo, useCallback } from 'react';
import { TABLE_ORDER_SORT_OPTIONS, TABLE_ORDER_STATUS_OPTIONS } from '@constants/data/adminOrderData';
import useAdminOrder from '@hooks/admin/useAdminOrder';
import useAdminWorkspace from '@hooks/admin/useAdminWorkspace';
import { Order, OrderStatus, Table, TableOrderSession } from '@@types/index';
import { subHours } from 'date-fns';
import { dateConverter } from '@utils/FormatDate';

type OrderData = TableOrderSession | Order;
type OrderType = 'SESSION' | 'TOTAL';

function useAdminFetchOrder<T extends OrderData>(workspaceId: string | undefined, type: OrderType = 'TOTAL') {
  const { fetchTableOrderSessions, fetchOrders } = useAdminOrder(workspaceId);
  const { fetchWorkspaceTables } = useAdminWorkspace();

  const [data, setData] = useState<T[]>([]);
  const [tables, setTables] = useState<Table[]>([]);

  const [startDate, setStartDate] = useState<Date | null>(subHours(new Date(), 2));
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [tableNumber, setTableNumber] = useState<string>('ALL');
  const [orderStatuses, setOrderStatuses] = useState<OrderStatus[]>([]);

  const [sortOrder, setSortOrder] = useState<string>('LATEST');
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  useEffect(() => {
    if (workspaceId) {
      fetchWorkspaceTables(workspaceId).then((res) => setTables(res.data));
    }
  }, [workspaceId]);

  useEffect(() => {
    if (!startDate || !endDate) return;

    const start = dateConverter(startDate);
    const end = dateConverter(endDate);
    const tableNo = tableNumber === 'ALL' ? undefined : Number(tableNumber);

    const statusParams = orderStatuses.length > 0 ? orderStatuses : undefined;

    const fetchData = async () => {
      try {
        if (type === 'SESSION') {
          const res = await fetchTableOrderSessions({
            startDate: start,
            endDate: end,
            tableNumber: tableNo,
          });
          setData(res.data as T[]);
        } else {
          const res = await fetchOrders({
            startDate: start,
            endDate: end,
            tableNumber: tableNo,
            statuses: statusParams,
          });
          setData(res.data as T[]);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [startDate, endDate, tableNumber, orderStatuses, workspaceId, type]);

  const processedData = useMemo(() => {
    let result = [...data];

    if (type === 'TOTAL' && searchKeyword.trim() !== '') {
      result = result.filter((item) => {
        const order = item as Order;
        return String(order.orderNumber).includes(searchKeyword) || order.customerName.includes(searchKeyword);
      });
    }

    return result.sort((a, b) => {
      const timeA = new Date(a.createdAt).getTime();
      const timeB = new Date(b.createdAt).getTime();
      return sortOrder === 'LATEST' ? timeB - timeA : timeA - timeB;
    });
  }, [data, sortOrder, searchKeyword, type]);

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

  const handleReset = useCallback(() => {
    setStartDate(subHours(new Date(), 2));
    setEndDate(new Date());
    setTableNumber('ALL');
    setOrderStatuses([]);
    setSortOrder('LATEST');
    setSearchKeyword('');
  }, []);

  return {
    tables,
    data: processedData,
    tableOptions,
    statusOptions: TABLE_ORDER_STATUS_OPTIONS,
    sortOptions: TABLE_ORDER_SORT_OPTIONS,
    filters: {
      startDate,
      endDate,
      tableNumber,
      orderStatuses,
      sortOrder,
      searchKeyword,
    },
    setFilters: {
      setStartDate,
      setEndDate,
      setTableNumber,
      setOrderStatuses,
      setSortOrder,
      setSearchKeyword,
    },
    handleReset,
  };
}

export default useAdminFetchOrder;
