import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import useOrdersWebsocket from '@hooks/user/useOrdersWebsocket';
import useAdminOrder from '@hooks/admin/useAdminOrder';
import useAdminProducts from '@hooks/admin/useAdminProducts';
import { colFlex, rowFlex } from '@styles/flexStyles';
import AppContainer from '@components/common/container/AppContainer';
import { OrderStatus, RIGHT_SIDEBAR_ACTION } from '@@types/index';
import TitledOrderStatusList from '@components/admin/order/realtime/TitledOrderStatusList';
import { useAtomValue, useSetAtom } from 'jotai';
import { adminOrdersAtom } from '@jotai/admin/atoms';
import { externalSidebarAtom } from '@jotai/atoms';
import NewCommonButton from '@components/common/button/NewCommonButton';
import { GA_EVENT } from '@constants/analytics';
import { trackEvent } from '@utils/analytics';
import RightSidebarModal from '@components/common/modal/RightSidebarModal';
import OrderByProductList from '@components/admin/order/realtime/OrderByProductList';
import TableUsageSummary from '@components/admin/order/realtime/TableUsageSummary';
import styled from '@emotion/styled';
import { useWakeLock } from '@hooks/useWakeLock';

const ListContainer = styled.div`
  width: 95%;
  gap: 20px;
  ${colFlex({ justify: 'center', align: 'center' })}
`;

const TopRow = styled.div`
  width: 100%;
  gap: 12px;
  ${rowFlex({ align: 'center' })}
`;

const SummarySlot = styled.div`
  flex: 1;
  min-width: 0;
`;

function AdminOrderRealtime() {
  useWakeLock();

  const { workspaceId } = useParams<{ workspaceId: string }>();
  const location = useLocation();
  const setExternalSidebar = useSetAtom(externalSidebarAtom);
  const { fetchTodayOrders } = useAdminOrder(workspaceId);
  const { fetchProducts } = useAdminProducts(workspaceId);

  const orders = useAtomValue(adminOrdersAtom);
  const notPaidOrders = orders.filter((order) => order.status === OrderStatus.NOT_PAID);
  const paidOrders = orders.filter((order) => order.status === OrderStatus.PAID);
  const servedOrders = orders.filter((order) => order.status === OrderStatus.SERVED);

  // 소켓이 거부되면 주문을 다시 불러온다. 토큰 만료가 원인이면 이 요청의 401로 토큰이 갱신되고, 갱신도 실패하면 로그인 화면으로 이동한다.
  useOrdersWebsocket(workspaceId, fetchTodayOrders);

  useEffect(() => {
    fetchTodayOrders();
    fetchProducts();
  }, []);

  const handleOpenProductSummary = () => {
    setExternalSidebar({
      location,
      title: '실시간 상품별 주문량',
      subtitle: '*결제 완료 주문만 표시됩니다.',
      action: RIGHT_SIDEBAR_ACTION.OPEN,
      content: <OrderByProductList />,
    });
    trackEvent(GA_EVENT.PRODUCT_SUMMARY_OPEN, { workspace_id: workspaceId });
  };

  return (
    <AppContainer useFlex={colFlex({ justify: 'start', align: 'center' })} disableLayoutScale>
      <ListContainer>
        <TopRow>
          <SummarySlot>
            <TableUsageSummary workspaceId={workspaceId} />
          </SummarySlot>
          <NewCommonButton size="sm" onClick={handleOpenProductSummary}>
            상품별 주문량
          </NewCommonButton>
        </TopRow>
        <TitledOrderStatusList
          orders={notPaidOrders}
          orderStatus={OrderStatus.NOT_PAID}
          title={'주문 완료'}
          description={'주문이 완료되었으나, 결제가 아직 확인되지 않은 상태입니다.'}
        />
        <TitledOrderStatusList
          orders={paidOrders}
          orderStatus={OrderStatus.PAID}
          title={'결제 완료'}
          description={
            '결제가 확인되어 현재 조리 중인 주문입니다. 왼쪽부터 오래된 주문 순으로 표시됩니다. 주문 후 15분이 지나면 주황, 25분이 지나면 빨강으로 표시됩니다.'
          }
        />
        <TitledOrderStatusList orders={servedOrders} orderStatus={OrderStatus.SERVED} title={'서빙 완료'} description={'서빙이 완료된 주문입니다.'} />
        <RightSidebarModal useExternalControl={{ location }} />
      </ListContainer>
    </AppContainer>
  );
}

export default AdminOrderRealtime;
