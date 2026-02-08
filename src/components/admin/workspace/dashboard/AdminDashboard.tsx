import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import styled from '@emotion/styled';
import { adminDashboardAtom } from '@jotai/admin/atoms';
import useAdminDashboard from '@hooks/admin/useAdminDashboard';
import { rowFlex, colFlex } from '@styles/flexStyles';
import { EmptyText } from '@styles/dashboardStyles';
import StatCard from './StatCard';
import RecentOrders from './RecentOrders';
import NoticeBanner from './NoticeBanner';
import OutOfStockList from './OutOfStockList';
import TopSellingList from './TopSellingList';
import MemoCard from './MemoCard';

const DashboardContainer = styled.div`
  width: 800px;
  padding-bottom: 40px;
  gap: 16px;
  ${colFlex()};
`;

const StatCardsWrapper = styled.div`
  flex-wrap: wrap;
  gap: 10px 9px;
  ${rowFlex({ justify: 'flex-start' })}
`;

const BottomRow = styled.div`
  width: 100%;
  ${rowFlex({ justify: 'space-between' })}
`;

function AdminDashboard() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { fetchDashboard } = useAdminDashboard();
  const dashboardData = useAtomValue(adminDashboardAtom);

  useEffect(() => {
    fetchDashboard(workspaceId);
  }, [workspaceId]);

  const { workspace, stats, topSellingProducts, recentOrders, outOfStockProducts } = dashboardData;

  const usageRate = workspace.totalTables > 0 ? Math.round((workspace.occupiedTables / workspace.totalTables) * 100) : 0;
  const currentDate = new Date().toLocaleDateString();
  const todayTotalSales = (stats.totalSales / 10000).toLocaleString();

  return (
    <DashboardContainer>
      <NoticeBanner />

      <RecentOrders orders={recentOrders} />

      <StatCardsWrapper>
        <StatCard
          title="사용 중인 테이블"
          value={`${workspace.occupiedTables}/${workspace.totalTables}`}
          description={`${usageRate}% 사용률`}
          highlightRate={usageRate}
        />
        <StatCard title="오늘의 주문" value={`${stats.totalOrderCount}건`} description={`${currentDate} 0:00~`} />
        {/* todo: API에 없는 description 필드들은 어떻게? */}
        <StatCard title="오늘의 매출" value={`${todayTotalSales}만원`} description="전일 대비 --%" />
        <StatCard title="대기 주문" value={`${stats.averageOrderAmount}건`} description="평균 준비시간 --분" />
      </StatCardsWrapper>

      <BottomRow>
        <OutOfStockList products={outOfStockProducts} />
        <TopSellingList products={topSellingProducts} />
      </BottomRow>

      <MemoCard initialMemo={workspace.memo} />
    </DashboardContainer>
  );
}

export default AdminDashboard;
