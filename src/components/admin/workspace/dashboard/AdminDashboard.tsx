import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import styled from '@emotion/styled';
import { adminDashboardAtom, adminWorkspaceAtom } from '@jotai/admin/atoms';
import useAdminDashboard from '@hooks/admin/useAdminDashboard';
import { colFlex } from '@styles/flexStyles';
import StatCard from '@components/common/card/StatCard';
import NoticeBanner from './NoticeBanner';
import TopSellingList from './TopSellingList';
import MemoCard from './MemoCard';
import { getBusinessStartDate } from '@utils/dashboard';
import NotionGuideSection from './NotionGuideSection';
import InsightCard from './InsightCard';
import ShareSupportModal from '@components/admin/insight/ShareSupportModal';
import { InsightCardResponse } from '@@types/index';

const DashboardContainer = styled.div`
  width: 800px;
  padding-bottom: 40px;
  gap: 16px;
  ${colFlex()};
`;

const MainRow = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
  gap: 12px;
`;

const StatCardsWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px 9px;
`;

function AdminDashboard() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { fetchDashboard } = useAdminDashboard();
  const { dashboardWorkspaceInfo, stats } = useAtomValue(adminDashboardAtom);
  const workspace = useAtomValue(adminWorkspaceAtom);
  const [shareCard, setShareCard] = useState<InsightCardResponse | null>(null);
  const insightEnabled = import.meta.env.VITE_INSIGHT_CARD_ENABLED === 'true';

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

      {insightEnabled && workspaceId && <InsightCard workspaceId={workspaceId} onShareClick={setShareCard} />}

      <MainRow>
        <StatCardsWrapper>
          <StatCard title="사용 중인 테이블" value={usingTable} description={`${usageRate}% 사용률`} highlightRate={usageRate} />
          <StatCard title="오늘의 주문" value={stats.totalOrderCount} unit="건" description={`${businessStartDate} 9:00~`} />
          <StatCard title="오늘의 매출" value={todayTotalSales} unit="만원" />
          <StatCard title="평균 주문 당 매출" value={avgSales} unit="만원" />
        </StatCardsWrapper>
        <TopSellingList />
      </MainRow>

      <MemoCard initialMemo={workspace.memo} />
      <NotionGuideSection />
      {shareCard && <ShareSupportModal card={shareCard} workspaceName={workspace.name} onClose={() => setShareCard(null)} />}
    </DashboardContainer>
  );
}

export default AdminDashboard;
