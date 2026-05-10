import styled from '@emotion/styled';
import { RiStore3Line } from '@remixicon/react';
import { WorkspaceStats } from '@@types/index';
import { Color } from '@resources/colors';
import { formatNumber } from '@utils/formatNumber';
import { colFlex, rowFlex } from '@styles/flexStyles';
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

const FooterColumn = styled.div`
  gap: 2px;
  ${colFlex()}
`;

const FooterHint = styled.span`
  font-size: 10px;
  color: ${Color.HEAVY_GREY};
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
            <FooterColumn>
              <TrendRow>
                <StatTrendItem label="7일" delta={workspaces.newLast7Days} />
                <StatTrendItem label="30일" delta={workspaces.newLast30Days} />
              </TrendRow>
              <FooterHint>멤버가 1명 이상인 워크스페이스</FooterHint>
            </FooterColumn>
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
          footer={
            <FooterColumn>
              <ProgressIndicator rate={workspaces.onboardingCompletionRate} />
              <FooterHint>멤버가 있는 워크스페이스 중 온보딩 완료 비율</FooterHint>
            </FooterColumn>
          }
        />
      </StatGrid>
    </div>
  );
}

export default WorkspaceStatsSection;
