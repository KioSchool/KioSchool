import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useOrdersWebsocket from '@hooks/user/useOrdersWebsocket';
import { useRecoilValue } from 'recoil';
import { ordersAtom } from '@recoils/atoms';
import PaidOrderCard from '@components/admin/order/PaidOrderCard';
import NotPaidOrderCard from '@components/admin/order/NotPaidOrderCard';
import ServedOrderCard from '@components/admin/order/ServedOrderCard';
import useAdminOrder from '@hooks/admin/useAdminOrder';
import styled from '@emotion/styled';
import TitleNavBar from '@components/common/nav/TitleNavBar';
import VerticalDivider from '@components/common/divider/VerticalDivider';
import AppLabel from '@components/common/label/AppLabel';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100vw;
  height: 100vh;
  padding: 20px;
  box-sizing: border-box;
`;

const KanbanContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 24px;
  height: 65%;
  justify-content: center;
`;

const OrderColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  gap: 10px;
  overflow: auto;
  scrollbar-width: none;
`;

const OrderHeader = styled.div`
  background: white;
  position: sticky;
  top: 0;
  width: 350px;
  height: 110px;
  flex-basis: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const ProductsByOrderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 20%;
`;

const ProductsByOrderSubContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  height: 100%;
  gap: 10px;
  background: #f8f8f8;
`;

function AdminOrder() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { subscribeOrders } = useOrdersWebsocket(workspaceId);
  const { fetchTodayOrders } = useAdminOrder(workspaceId);
  const orders = useRecoilValue(ordersAtom);

  useEffect(() => {
    subscribeOrders();
    fetchTodayOrders();
  }, []);

  const notPaidOrders = orders.filter((it) => it.status === 'NOT_PAID');
  const paidOrders = orders.filter((it) => it.status === 'PAID');
  const servedOrders = orders.filter((it) => it.status === 'SERVED');

  return (
    <Container>
      <TitleNavBar title={'실시간 주문 조회'} />
      <KanbanContainer>
        <OrderColumnContainer>
          <OrderHeader>
            <AppLabel size={22} style={{ fontWeight: 600 }}>
              결제 대기
            </AppLabel>
          </OrderHeader>
          {notPaidOrders.map((it) => (
            <NotPaidOrderCard order={it} key={it.id} />
          ))}
        </OrderColumnContainer>
        <VerticalDivider />
        <OrderColumnContainer>
          <OrderHeader>
            <AppLabel size={22} style={{ fontWeight: 600 }}>
              결제 완료
            </AppLabel>
          </OrderHeader>
          {paidOrders.map((it) => (
            <PaidOrderCard order={it} key={it.id} />
          ))}
        </OrderColumnContainer>
        <VerticalDivider />
        <OrderColumnContainer>
          <OrderHeader>
            <AppLabel size={22} style={{ fontWeight: 600 }}>
              서빙 완료
            </AppLabel>
          </OrderHeader>
          {servedOrders.map((it) => (
            <ServedOrderCard order={it} key={it.id} />
          ))}
        </OrderColumnContainer>
      </KanbanContainer>
      <ProductsByOrderContainer>
        <ProductsByOrderSubContainer> </ProductsByOrderSubContainer>
      </ProductsByOrderContainer>
    </Container>
  );
}

export default AdminOrder;
