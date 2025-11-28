import { useParams } from 'react-router-dom';
import CustomSelect from '@components/common/select/CustomSelect';
import CustomDatePicker from '@components/common/date-picker/CustomDatePicker';
import styled from '@emotion/styled';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { Color } from '@resources/colors';
import { RiRefreshLine } from '@remixicon/react';
import AppContainer from '@components/common/container/AppContainer';
import OrderSessionCard from '@components/admin/order/table/OrderSessionCard';
import { useAdminTableOrder } from '@hooks/admin/useAdminTableOrder';

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
  height: 500px;
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
  const { isLoading, sessions, tableSessionFilters, setTableSessionFilters, handleReset, tableOptions, statusOptions, sortOptions } =
    useAdminTableOrder(workspaceId);

  const { startDate, endDate, tableNumber, serveStatus, sortOrder } = tableSessionFilters;
  const { setStartDate, setEndDate, setTableNumber, setServeStatus, setSortOrder } = setTableSessionFilters;

  const dateRangeLabel = startDate && endDate ? `${startDate.toLocaleDateString()} ~ ${endDate.toLocaleDateString()}` : '날짜 선택';

  return (
    <AppContainer useFlex={colFlex({ justify: 'start' })}>
      <>
        <FilterContainer>
          <ResetButton onClick={handleReset}>
            <RiRefreshLine size={14} />
            초기화
          </ResetButton>
          <CustomSelect value={sortOrder} options={sortOptions} onChange={setSortOrder} highlightOnSelect={true} width="120px" />
          <CustomSelect value={dateRangeLabel} triggerLabel={dateRangeLabel} highlightOnSelect={true} width="250px">
            <CustomDatePicker startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate} />
          </CustomSelect>
          <CustomSelect value={serveStatus} options={statusOptions} onChange={setServeStatus} highlightOnSelect={true} width="120px" />
          <CustomSelect value={tableNumber} options={tableOptions} onChange={setTableNumber} highlightOnSelect={true} width="150px" />
        </FilterContainer>

        <SessionListContainer>
          {isLoading ? (
            <FallbackContainer>데이터를 불러오는 중입니다...</FallbackContainer>
          ) : sessions.length > 0 ? (
            sessions.map((data) => {
              const sessionTotalPrice = data.orders.reduce((acc, order) => {
                return acc + order.totalPrice;
              }, 0);
              return (
                <OrderSessionCard
                  key={data.id}
                  sessionStartDate={new Date(data.createdAt)}
                  sessionEndDate={data.endAt ? new Date(data.endAt) : new Date(data.expectedEndAt)}
                  endAt={data.endAt}
                  tableNumber={data.tableNumber}
                  serveStatus={serveStatus}
                  sessionTotalPrice={sessionTotalPrice}
                  orders={data.orders}
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
