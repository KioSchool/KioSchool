import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import styled from '@emotion/styled';
import { adminDashboardAtom, adminWorkspaceAtom } from '@jotai/admin/atoms';
import useAdminDashboard from '@hooks/admin/useAdminDashboard';
import { rowFlex, colFlex } from '@styles/flexStyles';
import StatCard from './StatCard';
import RecentOrders from './RecentOrders';
import NoticeBanner from './NoticeBanner';
import OutOfStockList from './OutOfStockList';
import TopSellingList from './TopSellingList';
import MemoCard from './MemoCard';
import { getBusinessStartDate } from '@utils/dashboard';

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
  const { dashboardWorkspaceInfo, stats } = useAtomValue(adminDashboardAtom);
  const workspace = useAtomValue(adminWorkspaceAtom);

  useEffect(() => {
    fetchDashboard(workspaceId);
  }, [workspaceId]);

  if (!dashboardWorkspaceInfo) return null;

  const usingTable = `${dashboardWorkspaceInfo.occupiedTables}/${dashboardWorkspaceInfo.totalTables}`;
  const usageRate = dashboardWorkspaceInfo.totalTables > 0 ? Math.round((dashboardWorkspaceInfo.occupiedTables / dashboardWorkspaceInfo.totalTables) * 100) : 0;
  const businessStartDate = getBusinessStartDate(new Date());
  const todayTotalSales = Math.floor(stats.totalSales / 10000).toLocaleString();
  const avgSales = Math.floor(stats.averageOrderAmount / 10000).toLocaleString();

  return (
    <DashboardContainer>
      <NoticeBanner />

      <RecentOrders />

      <StatCardsWrapper>
        <StatCard title="사용 중인 테이블" value={usingTable} description={`${usageRate}% 사용률`} highlightRate={usageRate} />
        <StatCard title="오늘의 주문" value={`${stats.totalOrderCount}건`} description={`${businessStartDate} 9:00~`} />
        {/* todo: API에 없는 description 필드들은 어떻게? */}
        <StatCard title="오늘의 매출" value={`${todayTotalSales}만원`} description="전일 대비 --%" />
        <StatCard title="평균 주문 당 매출" value={`${avgSales}만원`} />
      </StatCardsWrapper>

      <BottomRow>
        <OutOfStockList />
        <TopSellingList />
      </BottomRow>

      <MemoCard initialMemo={workspace.memo} />
    </DashboardContainer>
  );
}

export default AdminDashboard;
