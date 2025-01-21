import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useOrdersWebsocket from '@hooks/user/useOrdersWebsocket';
import useAdminOrder from '@hooks/admin/useAdminOrder';
import useAdminProducts from '@hooks/admin/useAdminProducts';
import { colFlex } from '@styles/flexStyles';
import AppContainer from '@components/common/container/AppContainer';
import { OrderStatus } from '@@types/index';
import OrderStatusList from '@components/admin/order/OrderStatusList';
import styled from '@emotion/styled';
import { ordersAtom } from '@recoils/atoms';
import { useRecoilValue } from 'recoil';

const HorizontalLine = styled.hr`
  width: 100%;
  border: 0.3px solid #eeecec;
`;

function AdminOrderRealtime() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { subscribeOrders } = useOrdersWebsocket(workspaceId);
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
  }, []);

  return (
    <AppContainer useFlex={colFlex({ justify: 'center' })} customGap={'15px'} titleNavBarProps={{ title: '실시간 주문 조회' }}>
      <>
        <OrderStatusList filteredOrders={notPaidOrders} title={'주문 완료'} />
        <HorizontalLine />
        <OrderStatusList filteredOrders={paidOrders} title={'결제 완료'} />
        <HorizontalLine />
        <OrderStatusList filteredOrders={servedOrders} title={'서빙 완료'} />
      </>
    </AppContainer>
  );
}

export default AdminOrderRealtime;
