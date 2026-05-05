import { useEffect, useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { useSearchParams } from 'react-router-dom';
import AppContainer from '@components/common/container/AppContainer';
import Pagination from '@components/common/pagination/Pagination';
import OrdersFilterBar from '@components/super-admin/orders/OrdersFilterBar';
import OrdersResultArea from '@components/super-admin/orders/OrdersResultArea';
import useSuperAdminOrders from '@hooks/super-admin/useSuperAdminOrders';
import { OrdersFilter, PaginationResponse, SuperAdminOrder } from '@@types/index';
import { defaultPaginationValue } from '@@types/defaultValues';
import { Color } from '@resources/colors';
import { colFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';
import { parseOrdersFilterFromParams, serializeOrdersFilterToParams, toFetchParams } from '@utils/ordersFilter';

const PAGE_SIZE = 20;

const PageContainer = styled.div`
  width: 100%;
  max-width: 1100px;
  padding: 72px 24px 40px;
  gap: 16px;
  min-width: 0;
  ${colFlex()}

  ${mobileMediaQuery} {
    padding: 56px 14px 24px;
    gap: 12px;
  }
`;

const PageTitle = styled.h1`
  font-size: 22px;
  font-weight: 700;
  color: ${Color.BLACK};
  margin: 0;
  letter-spacing: -0.01em;

  ${mobileMediaQuery} {
    font-size: 18px;
  }
`;

function SuperAdminOrders() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [orders, setOrders] = useState<PaginationResponse<SuperAdminOrder>>(defaultPaginationValue);
  const { fetchAllOrders } = useSuperAdminOrders();

  const qs = searchParams.toString();
  const filter = useMemo<OrdersFilter>(() => parseOrdersFilterFromParams(searchParams), [qs]);

  useEffect(() => {
    const page = Number(searchParams.get('page') ?? 0);
    fetchAllOrders({ ...toFetchParams(filter), page, size: PAGE_SIZE }).then(setOrders);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qs, fetchAllOrders]);

  const handleFilterChange = (next: OrdersFilter) => {
    const params = serializeOrdersFilterToParams(next);
    params.set('page', '0');
    setSearchParams(params);
  };

  const handleReset = () => {
    setSearchParams(new URLSearchParams());
  };

  const handlePageChange = (page: number) => {
    const params = serializeOrdersFilterToParams(filter);
    params.set('page', page.toString());
    setSearchParams(params);
  };

  return (
    <AppContainer useFlex={colFlex({ align: 'center' })} backgroundColor={Color.LIGHT_GREY} useTitle={false} disableLayoutScale>
      <PageContainer>
        <PageTitle>전체 주문 모니터링</PageTitle>
        <OrdersFilterBar filter={filter} onChange={handleFilterChange} onReset={handleReset} />
        <OrdersResultArea orders={orders.content} />
        <Pagination totalPageCount={orders.totalPages} paginateFunction={handlePageChange} />
      </PageContainer>
    </AppContainer>
  );
}

export default SuperAdminOrders;
