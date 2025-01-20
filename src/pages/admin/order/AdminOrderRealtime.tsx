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

const HorizontalLine = styled.hr`
  width: 100%;
  border: 0.3px solid #eeecec;
`;

function AdminOrderRealtime() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { subscribeOrders } = useOrdersWebsocket(workspaceId);
  const { fetchTodayOrders } = useAdminOrder(workspaceId);
  const { fetchProducts } = useAdminProducts(workspaceId);

  useEffect(() => {
    subscribeOrders();
    fetchTodayOrders();
    fetchProducts();
  }, []);

  return (
    <AppContainer useFlex={colFlex({ justify: 'center' })} customGap={'15px'} titleNavBarProps={{ title: '실시간 주문 조회' }}>
      <>
        <OrderStatusList orderStatus={OrderStatus.NOT_PAID} />
        <HorizontalLine />
        <OrderStatusList orderStatus={OrderStatus.PAID} />
        <HorizontalLine />
        <OrderStatusList orderStatus={OrderStatus.SERVED} />
      </>
    </AppContainer>
  );
}

export default AdminOrderRealtime;
