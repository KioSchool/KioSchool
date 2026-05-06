import { useEffect, useMemo, useState } from 'react';
import { Location, useSearchParams } from 'react-router-dom';
import { useAtom } from 'jotai';
import AppContainer from '@components/common/container/AppContainer';
import Pagination from '@components/common/pagination/Pagination';
import PageHeader from '@components/common/page/PageHeader';
import SuperAdminPageContainer from '@components/super-admin/SuperAdminPageContainer';
import RightSidebarModal from '@components/common/modal/RightSidebarModal';
import OrdersFilterBar from '@components/super-admin/orders/OrdersFilterBar';
import OrdersResultArea from '@components/super-admin/orders/OrdersResultArea';
import OrderDetailContent from '@components/super-admin/orders/OrderDetailContent';
import useSuperAdminOrders from '@hooks/super-admin/useSuperAdminOrders';
import { OrdersFilter, PaginationResponse, RIGHT_SIDEBAR_ACTION, SuperAdminOrder } from '@@types/index';
import { defaultPaginationValue } from '@@types/defaultValues';
import { colFlex } from '@styles/flexStyles';
import { externalSidebarAtom } from '@jotai/atoms';
import { parseOrdersFilterFromParams, serializeOrdersFilterToParams, toFetchParams } from '@utils/ordersFilter';
import { SUPER_ADMIN_ROUTES } from '@constants/routes';

const PAGE_SIZE = 20;

function SuperAdminOrders() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [orders, setOrders] = useState<PaginationResponse<SuperAdminOrder>>(defaultPaginationValue);
  const [selectedOrder, setSelectedOrder] = useState<SuperAdminOrder | null>(null);
  const [, setExternalSidebar] = useAtom(externalSidebarAtom);
  const { fetchAllOrders } = useSuperAdminOrders();

  const qs = searchParams.toString();
  const filter = useMemo<OrdersFilter>(() => parseOrdersFilterFromParams(searchParams), [qs]);

  useEffect(() => {
    const page = Number(searchParams.get('page') ?? 0);
    fetchAllOrders({ ...toFetchParams(filter), page, size: PAGE_SIZE }).then(setOrders);
  }, [qs, fetchAllOrders]);

  const handleFilterChange = (next: OrdersFilter) => {
    const params = serializeOrdersFilterToParams(next);
    params.set('page', '0');
    setSearchParams(params, { replace: true });
  };

  const handleReset = () => setSearchParams(new URLSearchParams(), { replace: true });

  const handlePageChange = (page: number) => {
    const params = serializeOrdersFilterToParams(filter);
    params.set('page', page.toString());
    setSearchParams(params, { replace: true });
  };

  const handleSelect = (order: SuperAdminOrder) => {
    setSelectedOrder(order);
    setExternalSidebar({
      action: RIGHT_SIDEBAR_ACTION.OPEN,
      title: `주문 #${order.orderNumber}`,
      content: <OrderDetailContent order={order} onClose={() => setExternalSidebar({ action: RIGHT_SIDEBAR_ACTION.CLOSE })} />,
      location: { pathname: SUPER_ADMIN_ROUTES.ORDERS } as Location,
    });
  };

  return (
    <AppContainer useFlex={colFlex({ align: 'center' })} useTitle={false}>
      <SuperAdminPageContainer>
        <PageHeader title="전체 주문 모니터링" description="모든 워크스페이스의 주문을 시간·상태·워크스페이스 단위로 추적합니다." />
        <OrdersFilterBar filter={filter} onChange={handleFilterChange} onReset={handleReset} />
        <OrdersResultArea orders={orders.content} selectedOrderId={selectedOrder?.id ?? null} onSelect={handleSelect} onResetFilter={handleReset} />
        <Pagination totalPageCount={orders.totalPages} paginateFunction={handlePageChange} />
      </SuperAdminPageContainer>
      <RightSidebarModal useExternalControl={{ location: { pathname: SUPER_ADMIN_ROUTES.ORDERS } as Location }} />
    </AppContainer>
  );
}

export default SuperAdminOrders;
