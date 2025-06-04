import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useOrdersWebsocket from '@hooks/user/useOrdersWebsocket';
import useAdminOrder from '@hooks/admin/useAdminOrder';
import useAdminProducts from '@hooks/admin/useAdminProducts';
import { colFlex } from '@styles/flexStyles';
import AppContainer from '@components/common/container/AppContainer';
import { OrderStatus } from '@@types/index';
import TitledOrderStatusList from '@components/admin/order/realtime/TitledOrderStatusList';
import styled from '@emotion/styled';
import { ordersAtom } from '@recoils/atoms';
import { useRecoilValue } from 'recoil';

const HorizontalLine = styled.hr`
  width: 100%;
  border: 0.3px solid #eeecec;
`;

function AdminOrderRealtime() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { subscribeOrders, unsubscribeOrders } = useOrdersWebsocket(workspaceId);
  const { fetchTodayOrders } = useAdminOrder(workspaceId);
  const { fetchProducts } = useAdminProducts(workspaceId);

  const orders = useRecoilValue(ordersAtom);
  const notPaidOrders = orders.filter((order) => order.status === OrderStatus.NOT_PAID);
  const paidOrders = orders.filter((order) => order.status === OrderStatus.PAID);
  const servedOrders = orders.filter((order) => order.status === OrderStatus.SERVED);

  useEffect(() => {
    subscribeOrders();
    fetchTodayOrders();
    fetchProducts();

    return () => {
      unsubscribeOrders();
    };
  }, []);

  return (
    <AppContainer
      useFlex={colFlex({ justify: 'center' })}
      customGap={'15px'}
      useScroll={true}
      titleNavBarProps={{ title: '실시간 주문 조회' }}
      useNavBackground={true}
    >
      <>
        <TitledOrderStatusList orders={notPaidOrders} title={'주문 완료'} />
        <HorizontalLine />
        <TitledOrderStatusList orders={paidOrders} title={'결제 완료'} />
        <HorizontalLine />
        <TitledOrderStatusList orders={servedOrders} title={'서빙 완료'} />
      </>
    </AppContainer>
  );
}

export default AdminOrderRealtime;
