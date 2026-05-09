import { RiCloseLine, RiMoneyDollarCircleLine, RiStore3Line } from '@remixicon/react';
import { DashboardInsights, WorkspaceStats } from '@@types/index';
import { formatCurrency, formatNumber } from '@utils/formatNumber';
import StatCard from './StatCard';
import StatCardIcon from './StatCardIcon';
import StatGrid from './StatGrid';
import SectionTitle from './SectionTitle';

interface ActiveWorkspaceSectionProps {
  insights: DashboardInsights;
  workspaces: WorkspaceStats;
}

function ActiveWorkspaceSection({ insights, workspaces }: ActiveWorkspaceSectionProps) {
  const activeRate7 = workspaces.total > 0 ? ((insights.activeWorkspacesLast7Days / workspaces.total) * 100).toFixed(1) : '0.0';
  const activeRate30 = workspaces.total > 0 ? ((insights.activeWorkspacesLast30Days / workspaces.total) * 100).toFixed(1) : '0.0';
  const cancelRate =
    insights.totalOrdersForCancelRate > 0 ? ((insights.cancelledOrdersLast30Days / insights.totalOrdersForCancelRate) * 100).toFixed(1) : '0.0';

  return (
    <div>
      <SectionTitle>운영 지표 (최근 30일)</SectionTitle>
      <StatGrid>
        <StatCard
          icon={
            <StatCardIcon>
              <RiStore3Line size={18} />
            </StatCardIcon>
          }
          label="활성 워크스페이스 (7일)"
          value={formatNumber(insights.activeWorkspacesLast7Days)}
          footer={
            <span style={{ fontSize: 11, color: '#888' }}>
              {activeRate7}% of {formatNumber(workspaces.total)}
            </span>
          }
        />
        <StatCard
          icon={
            <StatCardIcon>
              <RiStore3Line size={18} />
            </StatCardIcon>
          }
          label="활성 워크스페이스 (30일)"
          value={formatNumber(insights.activeWorkspacesLast30Days)}
          footer={
            <span style={{ fontSize: 11, color: '#888' }}>
              {activeRate30}% of {formatNumber(workspaces.total)}
            </span>
          }
        />
        <StatCard
          icon={
            <StatCardIcon>
              <RiMoneyDollarCircleLine size={18} />
            </StatCardIcon>
          }
          label="평균 객단가 (AOV)"
          value={formatCurrency(insights.averageOrderValue)}
          valueSize="md"
        />
        <StatCard
          icon={
            <StatCardIcon>
              <RiCloseLine size={18} />
            </StatCardIcon>
          }
          label="취소율 (30일)"
          value={`${cancelRate}%`}
          footer={
            <span style={{ fontSize: 11, color: '#888' }}>
              {formatNumber(insights.cancelledOrdersLast30Days)}건 / {formatNumber(insights.totalOrdersForCancelRate)}건
            </span>
          }
        />
      </StatGrid>
    </div>
  );
}

export default ActiveWorkspaceSection;
