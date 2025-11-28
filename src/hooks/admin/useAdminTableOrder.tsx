import { useEffect, useState, useMemo } from 'react';
import { TABLE_ORDER_SORT_OPTIONS, TABLE_ORDER_STATUS_OPTIONS } from '@constants/data/adminOrderData';
import useAdminOrder from '@hooks/admin/useAdminOrder';
import useAdminWorkspace from '@hooks/admin/useAdminWorkspace';
import { Table, TableOrderSession } from '@@types/index';
import { subHours } from 'date-fns';
import { dateConverter } from '@utils/FormatDate';

const LOADING_DELAY_MS = 300;

export const useAdminTableOrder = (workspaceId: string | undefined) => {
  const { fetchTableOrderSessions } = useAdminOrder(workspaceId);
  const { fetchWorkspaceTables } = useAdminWorkspace();

  const [sessionData, setSessionData] = useState<TableOrderSession[]>([]);
  const [tables, setTables] = useState<Table[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [startDate, setStartDate] = useState<Date | null>(subHours(new Date(), 2));
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  const [tableNumber, setTableNumber] = useState<string>('ALL');
  const [serveStatus, setServeStatus] = useState<string>('ALL');
  const [sortOrder, setSortOrder] = useState<string>('LATEST');

  useEffect(() => {
    if (workspaceId) {
      fetchWorkspaceTables(workspaceId).then((res) => setTables(res.data));
    }
  }, [workspaceId]);

  useEffect(() => {
    if (startDate && endDate) {
      const timer = setTimeout(() => {
        setIsLoading(true);
      }, LOADING_DELAY_MS);

      const start = dateConverter(startDate);
      const end = dateConverter(endDate);
      const tableNo = tableNumber === 'ALL' ? undefined : Number(tableNumber);

      fetchTableOrderSessions({ startDate: start, endDate: end, tableNumber: tableNo })
        .then((res) => {
          setSessionData(res.data);
        })
        .catch(console.error)
        .finally(() => {
          clearTimeout(timer);
          setIsLoading(false);
        });
    }
  }, [startDate, endDate, tableNumber]);

  const sortedSessions = useMemo(() => {
    let data = [...sessionData];

    if (sortOrder === 'LATEST') {
      data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else {
      data.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    }

    return data;
  }, [sessionData, sortOrder]);

  const tableOptions = useMemo(
    () => [{ value: 'ALL', label: '전체 테이블' }, ...tables.map((table) => ({ value: String(table.tableNumber), label: `${table.tableNumber}번 테이블` }))],
    [tables],
  );

  const handleReset = () => {
    setStartDate(subHours(new Date(), 2));
    setEndDate(new Date());
    setTableNumber('ALL');
    setServeStatus('ALL');
    setSortOrder('LATEST');
  };

  return {
    tables,
    isLoading,
    sessions: sortedSessions,
    tableSessionFilters: {
      startDate,
      endDate,
      tableNumber,
      serveStatus,
      sortOrder,
    },
    setTableSessionFilters: {
      setStartDate,
      setEndDate,
      setTableNumber,
      setServeStatus,
      setSortOrder,
    },
    handleReset,
    tableOptions,
    statusOptions: TABLE_ORDER_STATUS_OPTIONS,
    sortOptions: TABLE_ORDER_SORT_OPTIONS,
  };
};
