import styled from '@emotion/styled';
import { RiStore3Line } from '@remixicon/react';
import { WorkspaceStats } from '@@types/index';
import { formatNumber } from '@utils/formatNumber';
import { rowFlex } from '@styles/flexStyles';
import StatCard from './StatCard';
import StatCardIcon from './StatCardIcon';
import StatTrendItem from './StatTrendItem';
import StatGrid from './StatGrid';
import SectionTitle from './SectionTitle';
import ProgressIndicator from './ProgressIndicator';

const TrendRow = styled.div`
  gap: 12px;
  ${rowFlex()}
`;

interface WorkspaceStatsSectionProps {
  workspaces: WorkspaceStats;
}

function WorkspaceStatsSection({ workspaces }: WorkspaceStatsSectionProps) {
  const completionPercent = `${(workspaces.onboardingCompletionRate * 100).toFixed(1)}%`;
  return (
    <div>
      <SectionTitle>워크스페이스</SectionTitle>
      <StatGrid>
        <StatCard
          icon={
            <StatCardIcon>
              <RiStore3Line size={18} />
            </StatCardIcon>
          }
          label="전체 워크스페이스"
          value={formatNumber(workspaces.total)}
          footer={
            <TrendRow>
              <StatTrendItem label="7일" delta={workspaces.newLast7Days} />
              <StatTrendItem label="30일" delta={workspaces.newLast30Days} />
            </TrendRow>
          }
        />
        <StatCard
          icon={
            <StatCardIcon>
              <RiStore3Line size={18} />
            </StatCardIcon>
          }
          label="최근 30일 신규 생성"
          value={formatNumber(workspaces.newLast30Days)}
        />
        <StatCard
          icon={
            <StatCardIcon>
              <RiStore3Line size={18} />
            </StatCardIcon>
          }
          label="온보딩 완료율"
          value={completionPercent}
          footer={<ProgressIndicator rate={workspaces.onboardingCompletionRate} />}
        />
      </StatGrid>
    </div>
  );
}

export default WorkspaceStatsSection;
