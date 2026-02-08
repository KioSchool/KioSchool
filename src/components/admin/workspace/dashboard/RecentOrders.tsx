import styled from '@emotion/styled';
import { match } from 'ts-pattern';
import DashboardCard from './DashboardCard';
import { rowFlex } from '@styles/flexStyles';
import { ActionButton, EmptyText } from '@styles/dashboardStyles';
import RecentOrderCard from './RecentOrderCard';
import { useNavigate } from 'react-router-dom';
import { ADMIN_ROUTES } from '@constants/routes';
import { useAtomValue } from 'jotai';
import { adminDashboardAtom } from '@jotai/admin/atoms';

const OrderList = styled.div`
  width: 100%;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 8px;
  ${rowFlex({ justify: 'flex-start' })}
`;

function RecentOrders() {
  const navigate = useNavigate();
  const { recentOrders } = useAtomValue(adminDashboardAtom);

  const handleNavigate = () => {
    navigate(ADMIN_ROUTES.ORDER_REALTIME);
  };

  const rightAction = <ActionButton onClick={handleNavigate}>실시간 주문 조회 페이지로 이동 {'>'}</ActionButton>;

  return (
    <DashboardCard title="최근 주문 내역" height={160} rightAction={rightAction}>
      {match(recentOrders.length)
        .with(0, () => <EmptyText>현재 표시할 주문 내역이 없습니다.</EmptyText>)
        .otherwise(() => (
          <OrderList>
            {recentOrders.map((order) => (
              <RecentOrderCard key={order.id} order={order} />
            ))}
          </OrderList>
        ))}
    </DashboardCard>
  );
}

export default RecentOrders;
