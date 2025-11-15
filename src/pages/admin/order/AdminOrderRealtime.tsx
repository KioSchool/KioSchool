import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useOrdersWebsocket from '@hooks/user/useOrdersWebsocket';
import useAdminOrder from '@hooks/admin/useAdminOrder';
import useAdminProducts from '@hooks/admin/useAdminProducts';
import { colFlex } from '@styles/flexStyles';
import AppContainer from '@components/common/container/AppContainer';
import { OrderStatus } from '@@types/index';
import TitledOrderStatusList from '@components/admin/order/realtime/TitledOrderStatusList';
import { useAtomValue } from 'jotai';
import { adminOrdersAtom } from 'src/jotai/admin/atoms';
import RightSidebarModal from '@components/common/modal/RightSidebarModal';
import OrderByProductList from '@components/admin/order/realtime/OrderByProductList';
import styled from '@emotion/styled';

const ListContainer = styled.div`
  width: 100%;
  gap: 20px;
  ${colFlex({ justify: 'center', align: 'center' })}
`;

function AdminOrderRealtime() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { fetchTodayOrders } = useAdminOrder(workspaceId);
  const { fetchProducts } = useAdminProducts(workspaceId);

  const orders = useAtomValue(adminOrdersAtom);
  const notPaidOrders = orders.filter((order) => order.status === OrderStatus.NOT_PAID);
  const paidOrders = orders.filter((order) => order.status === OrderStatus.PAID);
  const servedOrders = orders.filter((order) => order.status === OrderStatus.SERVED);

  useOrdersWebsocket(workspaceId);

  useEffect(() => {
    fetchTodayOrders();
    fetchProducts();
  }, []);

  return (
    <AppContainer useFlex={colFlex({ justify: 'center' })} useNavBackground={true}>
      <ListContainer>
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
          description={'결제가 확인되어 현재 조리 중인 주문입니다. 왼쪽부터 오래된 주문 순으로 표시됩니다.'}
        />
        <TitledOrderStatusList orders={servedOrders} orderStatus={OrderStatus.SERVED} title={'서빙 완료'} description={'서빙이 완료된 주문입니다.'} />
        <RightSidebarModal title="실시간 상품별 주문량" subtitle="*결제 완료 주문만 표시됩니다." useOpenButton={true}>
          <OrderByProductList orders={paidOrders} />
        </RightSidebarModal>
      </ListContainer>
    </AppContainer>
  );
}

export default AdminOrderRealtime;
