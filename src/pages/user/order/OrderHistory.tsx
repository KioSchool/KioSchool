import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { useAtomValue } from 'jotai';
import useOrder from '@hooks/user/useOrder';
import useWorkspace from '@hooks/user/useWorkspace';
import useRefresh from '@hooks/useRefresh';
import { userWorkspaceAtom } from '@jotai/user/atoms';
import OrderStickyNavBar from '@components/user/order/OrderStickyNavBar';
import SessionOrderList from '@components/user/order/orderHistory/SessionOrderList';
import { Order } from '@@types/index';
import { Color } from '@resources/colors';
import { colFlex } from '@styles/flexStyles';

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 50px;
`;

const SubContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 20px 20px 40px 20px;
  ${colFlex({ justify: 'center', align: 'start' })}
`;

const EmptyText = styled.div`
  width: 100%;
  padding: 40px 0;
  text-align: center;
  font-size: 13px;
  color: ${Color.GREY};
`;

function OrderHistory() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');
  const workspaceId = searchParams.get('workspaceId');
  const tableNo = searchParams.get('tableNo');
  const tableHash = searchParams.get('tableHash');

  const { fetchSessionOrders } = useOrder();
  const { fetchWorkspace } = useWorkspace();
  const { allowPullToRefresh } = useRefresh();
  const workspace = useAtomValue(userWorkspaceAtom);
  const [sessionOrders, setSessionOrders] = useState<Order[] | null>(null);

  useEffect(() => {
    fetchSessionOrders(workspaceId, tableHash, orderId).then(setSessionOrders);
    fetchWorkspace(workspaceId);
    allowPullToRefresh();
  }, [orderId]);

  return (
    <Container className={'order-history-container'}>
      <OrderStickyNavBar showNavBar={true} workspaceName={workspace.name} tableNo={tableNo} useShareButton={false} />
      <SubContainer>
        {sessionOrders?.length === 0 && <EmptyText>현재 테이블의 주문 내역이 없습니다.</EmptyText>}
        {sessionOrders && sessionOrders.length > 0 && <SessionOrderList orders={sessionOrders} currentOrderId={Number(orderId)} />}
      </SubContainer>
    </Container>
  );
}

export default OrderHistory;
