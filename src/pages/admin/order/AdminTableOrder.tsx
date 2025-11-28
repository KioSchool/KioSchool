import { useEffect, useState } from 'react';
import { TABLE_ORDER_SORT_OPTIONS, TABLE_ORDER_STATUS_OPTIONS } from '@constants/data/adminOrderData';
import { useParams } from 'react-router-dom';
import useAdminOrder from '@hooks/admin/useAdminOrder';
import useAdminWorkspace from '@hooks/admin/useAdminWorkspace';
import { Table, TableOrderSession } from '@@types/index';
import CustomSelect from '@components/common/select/CustomSelect';
import CustomDatePicker from '@components/common/date-picker/CustomDatePicker';
import styled from '@emotion/styled';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { subHours } from 'date-fns';
import { dateConverter } from '@utils/FormatDate';
import { Color } from '@resources/colors';
import { RiRefreshLine } from '@remixicon/react';
import AppContainer from '@components/common/container/AppContainer';
import OrderSessionCard from '@components/admin/order/table/OrderSessionCard';

const FilterContainer = styled.div`
  width: 100%;
  gap: 10px;
  margin-bottom: 20px;
  ${rowFlex({ align: 'center' })};
`;

const ResetButton = styled.div`
  padding: 0 10px;
  height: 24px;
  background: ${Color.WHITE};
  border: 1px solid #e8eef2;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  color: #464a4d;
  gap: 4px;
  ${rowFlex({ justify: 'center', align: 'center' })}

  &:hover {
    border-color: ${Color.KIO_ORANGE};
    color: ${Color.KIO_ORANGE};
  }
`;

const FallbackContainer = styled.div`
  width: 100%;
  height: 400px;
  border: 1px solid #e8eef2;
  border-radius: 10px;
  font-size: 1.2rem;
  color: ${Color.GREY};
  ${colFlex({ justify: 'center', align: 'center' })};
`;

const SessionListContainer = styled.div`
  width: 100%;
  gap: 16px;
  ${colFlex({ align: 'flex-start' })}
`;

function AdminTableOrder() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
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
    fetchWorkspaceTables(workspaceId).then((res) => setTables(res.data));
  }, [workspaceId]);

  useEffect(() => {
    if (startDate && endDate) {
      setIsLoading(true);
      const start = dateConverter(startDate);
      const end = dateConverter(endDate);
      const tableNo = tableNumber === 'ALL' ? undefined : Number(tableNumber);

      fetchTableOrderSessions({ startDate: start, endDate: end, tableNumber: tableNo })
        .then((res) => {
          setSessionData(res.data);
        })
        .catch(console.error)
        .finally(() => setIsLoading(false));
    }
  }, [startDate, endDate, tableNumber]);

  const getFilteredAndSortedData = () => {
    let data = [...sessionData];

    if (sortOrder === 'LATEST') {
      data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else {
      data.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    }

    return data;
  };

  const filteredData = getFilteredAndSortedData();

  const tableOptions = [{ value: 'ALL', label: '전체 테이블' }, ...tables.map((t) => ({ value: String(t.tableNumber), label: `${t.tableNumber}번 테이블` }))];

  const dateRangeLabel = startDate && endDate ? `${startDate.toLocaleDateString()} ~ ${endDate.toLocaleDateString()}` : '날짜 선택';

  const handleReset = () => {
    setStartDate(subHours(new Date(), 2));
    setEndDate(new Date());
    setTableNumber('ALL');
    setServeStatus('ALL');
    setSortOrder('LATEST');
  };

  return (
    <AppContainer useFlex={colFlex({ justify: 'start' })}>
      <>
        <FilterContainer>
          <ResetButton onClick={handleReset}>
            <RiRefreshLine size={14} />
            초기화
          </ResetButton>
          <CustomSelect value={sortOrder} options={TABLE_ORDER_SORT_OPTIONS} onChange={setSortOrder} highlightOnSelect={true} width="120px" />
          <CustomSelect value={dateRangeLabel} triggerLabel={dateRangeLabel} highlightOnSelect={true} width="250px">
            <CustomDatePicker startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate} />
          </CustomSelect>
          <CustomSelect value={serveStatus} options={TABLE_ORDER_STATUS_OPTIONS} onChange={setServeStatus} highlightOnSelect={true} width="120px" />
          <CustomSelect value={tableNumber} options={tableOptions} onChange={setTableNumber} highlightOnSelect={true} width="150px" />
        </FilterContainer>
        <SessionListContainer>
          {isLoading ? (
            <FallbackContainer>데이터를 불러오는 중입니다...</FallbackContainer>
          ) : filteredData.length > 0 ? (
            filteredData.map((data) => {
              const sessionTotalPrice = data.orders.reduce((acc, order) => {
                return acc + order.totalPrice;
              }, 0);
              return (
                <OrderSessionCard
                  key={data.id}
                  orderSessionId={data.id}
                  sessionStartDate={new Date(data.createdAt)}
                  sessionEndDate={data.endAt ? new Date(data.endAt) : new Date(data.expectedEndAt)}
                  endAt={data.endAt}
                  tableNumber={data.tableNumber}
                  serveStatus={serveStatus}
                  sessionTotalPrice={sessionTotalPrice}
                />
              );
            })
          ) : (
            <FallbackContainer>조회된 주문 내역이 없습니다.</FallbackContainer>
          )}
        </SessionListContainer>
      </>
    </AppContainer>
  );
}

export default AdminTableOrder;
