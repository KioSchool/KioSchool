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

const Container = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 24px;
  width: 100%;
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
      <div>
        {notPaidOrders.map((it) => (
          <NotPaidOrderCard order={it} key={it.id} />
        ))}
      </div>
      <div>
        {paidOrders.map((it) => (
          <PaidOrderCard order={it} key={it.id} />
        ))}
      </div>
      <div>
        {servedOrders.map((it) => (
          <ServedOrderCard order={it} key={it.id} />
        ))}
      </div>
    </Container>
  );
}

export default AdminOrder;
