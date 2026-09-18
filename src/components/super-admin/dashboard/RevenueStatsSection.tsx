import { RiFileListLine, RiMoneyDollarCircleLine, RiStore3Line } from '@remixicon/react';
import styled from '@emotion/styled';
import { RevenueStats } from '@@types/index';
import { Color } from '@resources/colors';
import { formatCurrency, formatNumber } from '@utils/formatNumber';
import StatCard from './StatCard';
import StatCardIcon from './StatCardIcon';
import StatGrid from './StatGrid';
import SectionTitle from './SectionTitle';

const FooterHint = styled.span`
  font-size: 10px;
  color: ${Color.HEAVY_GREY};
`;

interface RevenueStatsSectionProps {
  revenue: RevenueStats;
  operatedWorkspaces: number;
}

function RevenueStatsSection({ revenue, operatedWorkspaces }: RevenueStatsSectionProps) {
  return (
    <div>
      <SectionTitle>매출 & 주문</SectionTitle>
      <StatGrid>
        <StatCard
          icon={
            <StatCardIcon>
              <RiMoneyDollarCircleLine size={18} />
            </StatCardIcon>
          }
          label="전체 누적 매출"
          value={formatCurrency(revenue.totalRevenueAllTime)}
          valueSize="md"
        />
        <StatCard
          icon={
            <StatCardIcon>
              <RiMoneyDollarCircleLine size={18} />
            </StatCardIcon>
          }
          label="최근 30일 매출"
          value={formatCurrency(revenue.totalRevenueLast30Days)}
          valueSize="md"
        />
        <StatCard
          icon={
            <StatCardIcon>
              <RiFileListLine size={18} />
            </StatCardIcon>
          }
          label="전체 누적 주문"
          value={formatNumber(revenue.totalOrdersAllTime)}
        />
        <StatCard
          icon={
            <StatCardIcon>
              <RiFileListLine size={18} />
            </StatCardIcon>
          }
          label="최근 30일 주문"
          value={formatNumber(revenue.totalOrdersLast30Days)}
        />
        <StatCard
          icon={
            <StatCardIcon>
              <RiStore3Line size={18} />
            </StatCardIcon>
          }
          label="전체 누적 운영 주점"
          value={formatNumber(operatedWorkspaces)}
          footer={<FooterHint>축제 달력에 포함된 운영일이 하루 이상 있는 주점</FooterHint>}
        />
      </StatGrid>
    </div>
  );
}

export default RevenueStatsSection;
