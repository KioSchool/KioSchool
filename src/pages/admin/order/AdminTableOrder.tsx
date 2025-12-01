import { useParams } from 'react-router-dom';
import CustomSelect from '@components/common/select/CustomSelect';
import CustomDatePicker from '@components/common/date-picker/CustomDatePicker';
import styled from '@emotion/styled';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { Color } from '@resources/colors';
import { RiRefreshLine } from '@remixicon/react';
import AppContainer from '@components/common/container/AppContainer';
import OrderSessionCard from '@components/admin/order/table/OrderSessionCard';
import useAdminFetchOrder from '@hooks/admin/useAdminFetchOrders';
import { TableOrderSession } from '@@types/index';

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
  const {
    data: sessions,
    filters,
    setFilters,
    handleReset,
    sortOptions,
    tableOptions,
    statusOptions,
  } = useAdminFetchOrder<TableOrderSession>(workspaceId, 'SESSION');

  const { startDate, endDate, tableNumber, orderStatus, sortOrder } = filters;
  const { setStartDate, setEndDate, setTableNumber, setOrderStatus, setSortOrder } = setFilters;

  const dateRangeLabel = startDate && endDate ? `${startDate.toLocaleDateString()} ~ ${endDate.toLocaleDateString()}` : '날짜 선택';

  return (
    <AppContainer useFlex={colFlex({ justify: 'start' })} customWidth={'1000px'}>
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
          <CustomSelect value={orderStatus} options={statusOptions} onChange={setOrderStatus} highlightOnSelect={true} width="120px" />
          <CustomSelect value={tableNumber} options={tableOptions} onChange={setTableNumber} highlightOnSelect={true} width="150px" />
        </FilterContainer>

        <SessionListContainer>
          {sessions.length > 0 ? (
            sessions.map((data) => {
              const sessionTotalPrice = data.orders.reduce((acc, order) => {
                return acc + order.totalPrice;
              }, 0);
              return (
                <OrderSessionCard
                  key={data.id}
                  sessionStartDate={new Date(data.createdAt)}
                  sessionEndDate={new Date(data.endAt || data.expectedEndAt)}
                  endAt={data.endAt}
                  tableNumber={data.tableNumber}
                  orderStatus={orderStatus}
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
