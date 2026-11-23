import { useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { useAtomValue, useSetAtom } from 'jotai';
import { OrderStatus } from '@@types/index';
import { DEMO_USER_ORDER_ID } from '@constants/data/demo/demoSeed';
import NewCommonButton from '@components/common/button/NewCommonButton';
import { demoStateAtom } from '@jotai/user/demoAtoms';
import { colFlex, rowFlex } from '@styles/flexStyles';
import DemoOrderStatusList from './DemoOrderStatusList';
import DemoTableUsageBar from './DemoTableUsageBar';

const ListContainer = styled.div<{ isMobile: boolean }>`
  width: ${({ isMobile }) => (isMobile ? '100%' : '95%')};
  gap: ${({ isMobile }) => (isMobile ? 12 : 20)}px;
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

interface DemoAdminOrdersPageProps {
  isMobile?: boolean;
}

function DemoAdminOrdersPage({ isMobile = false }: DemoAdminOrdersPageProps) {
  const { orders, step } = useAtomValue(demoStateAtom);
  const dispatch = useSetAtom(demoStateAtom);
  const containerRef = useRef<HTMLDivElement>(null);
  const byOldest = [...orders].sort((a, b) => a.createdAt.localeCompare(b.createdAt));
  const ordersOf = (status: OrderStatus) => byOldest.filter((order) => order.status === status);
  const userOrderStatus = orders.find((order) => order.id === DEMO_USER_ORDER_ID)?.status;

  // 폰은 주문판 줄마다 옆으로 넘겨 보므로, 손님이 방금 넣은 주문이 맨 오른쪽에 가려지지 않게 그 카드로 넘겨 둔다
  useEffect(() => {
    if (!isMobile) return;
    const card = containerRef.current?.querySelector(`[data-demo-order="${DEMO_USER_ORDER_ID}"]`);
    card?.scrollIntoView({ block: 'nearest', inline: 'center' });
  }, [isMobile, step, userOrderStatus]);

  return (
    <ListContainer ref={containerRef} isMobile={isMobile} data-demo-region>
      <TopRow>
        <SummarySlot>
          <DemoTableUsageBar />
        </SummarySlot>
        {!isMobile && (
          <NewCommonButton size="sm" onClick={() => dispatch({ type: 'UNSUPPORTED' })}>
            상품별 주문량
          </NewCommonButton>
        )}
      </TopRow>
      <DemoOrderStatusList
        orders={ordersOf(OrderStatus.NOT_PAID)}
        orderStatus={OrderStatus.NOT_PAID}
        title="주문 완료"
        description="주문이 완료되었으나, 결제가 아직 확인되지 않은 상태입니다."
      />
      <DemoOrderStatusList
        orders={ordersOf(OrderStatus.PAID)}
        orderStatus={OrderStatus.PAID}
        title="결제 완료"
        description="결제가 확인되어 현재 조리 중인 주문입니다. 왼쪽부터 오래된 주문 순으로 표시됩니다. 주문 후 15분이 지나면 주황, 25분이 지나면 빨강으로 표시됩니다."
      />
      <DemoOrderStatusList orders={ordersOf(OrderStatus.SERVED)} orderStatus={OrderStatus.SERVED} title="서빙 완료" description="서빙이 완료된 주문입니다." />
    </ListContainer>
  );
}

export default DemoAdminOrdersPage;
