import { RiCloseLine, RiMoneyDollarCircleLine, RiStore3Line } from '@remixicon/react';
import styled from '@emotion/styled';
import { DashboardInsights, WorkspaceStats } from '@@types/index';
import { Color } from '@resources/colors';
import { colFlex } from '@styles/flexStyles';
import { formatCurrency, formatNumber } from '@utils/formatNumber';
import StatCard from './StatCard';
import StatCardIcon from './StatCardIcon';
import StatGrid from './StatGrid';
import SectionTitle from './SectionTitle';

const FooterColumn = styled.div`
  gap: 2px;
  ${colFlex()}
`;

const FooterRate = styled.span`
  font-size: 11px;
  color: ${Color.GREY};
`;

const FooterHint = styled.span`
  font-size: 10px;
  color: ${Color.HEAVY_GREY};
`;

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
            <FooterColumn>
              <FooterRate>
                {activeRate7}% of {formatNumber(workspaces.total)}
              </FooterRate>
              <FooterHint>최근 7일간 주문 1건 이상 발생한 워크스페이스</FooterHint>
            </FooterColumn>
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
            <FooterColumn>
              <FooterRate>
                {activeRate30}% of {formatNumber(workspaces.total)}
              </FooterRate>
              <FooterHint>최근 30일간 주문 1건 이상 발생한 워크스페이스</FooterHint>
            </FooterColumn>
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
          footer={<FooterHint>전체 기간 총 매출 ÷ 총 주문 수</FooterHint>}
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
            <FooterColumn>
              <FooterRate>
                {formatNumber(insights.cancelledOrdersLast30Days)}건 / {formatNumber(insights.totalOrdersForCancelRate)}건
              </FooterRate>
              <FooterHint>최근 30일 취소 주문 ÷ 전체 주문</FooterHint>
            </FooterColumn>
          }
        />
      </StatGrid>
    </div>
  );
}

export default ActiveWorkspaceSection;
