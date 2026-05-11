import { useState } from 'react';
import styled from '@emotion/styled';
import { SuperAdminDashboard } from '@@types/index';
import { colFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';
import UserStatsSection from './UserStatsSection';
import WorkspaceStatsSection from './WorkspaceStatsSection';
import RevenueStatsSection from './RevenueStatsSection';
import DailyChartSection from './DailyChartSection';
import ActiveWorkspaceSection from './ActiveWorkspaceSection';
import FunnelSection from './FunnelSection';
import TopWorkspacesSection from './TopWorkspacesSection';
import OnboardingTimeSection from './OnboardingTimeSection';

const Stack = styled.div`
  width: 100%;
  gap: 24px;
  ${colFlex()}

  ${mobileMediaQuery} {
    gap: 18px;
  }
`;

interface DashboardSectionsProps {
  data: SuperAdminDashboard;
}

function DashboardSections({ data }: DashboardSectionsProps) {
  const [chartMode, setChartMode] = useState<'revenue' | 'orders'>('revenue');

  return (
    <Stack>
      <DailyChartSection data={data.insights.dailyLast30Days} mode={chartMode} onModeChange={setChartMode} />
      <ActiveWorkspaceSection insights={data.insights} workspaces={data.workspaces} />
      <UserStatsSection users={data.users} />
      <WorkspaceStatsSection workspaces={data.workspaces} />
      <RevenueStatsSection revenue={data.revenue} />
      <FunnelSection funnel={data.insights.funnel} />
      <OnboardingTimeSection stats={data.insights.onboardingTimeStats} />
      <TopWorkspacesSection items={data.insights.topWorkspaces} />
    </Stack>
  );
}

export default DashboardSections;
