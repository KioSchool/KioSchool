import { useParams } from 'react-router-dom';
import CustomSelect from '@components/common/select/CustomSelect';
import CustomDatePicker from '@components/common/date-picker/CustomDatePicker';
import styled from '@emotion/styled';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { Color } from '@resources/colors';
import { RiRefreshLine } from '@remixicon/react';
import AppContainer from '@components/common/container/AppContainer';
import OrderSessionDetailCard from '@components/admin/order/table/OrderSessionDetailCard';
import { useAdminTotalOrder } from '@hooks/admin/useAdminTotalOrder';
import useAdminProducts from '@hooks/admin/useAdminProducts';
import { useEffect } from 'react';

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

const OrderListContainer = styled.div`
  width: 100%;
  border: 1px solid #e8eef2;
  border-bottom: none;
  overflow: hidden;
  ${colFlex({ align: 'stretch' })}
`;

function AdminTotalOrder() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { orders, totalFilters, setTotalFilters, handleReset, tableOptions, statusOptions, sortOptions } = useAdminTotalOrder(workspaceId);
  const { fetchProducts } = useAdminProducts(workspaceId);

  useEffect(() => {
    if (workspaceId) {
      fetchProducts();
    }
  }, [workspaceId]);

  const { startDate, endDate, tableNumber, orderStatus, sortOrder } = totalFilters;
  const { setStartDate, setEndDate, setTableNumber, setOrderStatus, setSortOrder } = setTotalFilters;

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

        {orders.length > 0 ? (
          <OrderListContainer>
            {orders.map((order) => (
              <OrderSessionDetailCard key={order.id} {...order} />
            ))}
          </OrderListContainer>
        ) : (
          <FallbackContainer>조회된 주문 내역이 없습니다.</FallbackContainer>
        )}
      </>
    </AppContainer>
  );
}

export default AdminTotalOrder;
