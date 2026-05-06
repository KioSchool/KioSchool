import { RiFileListLine, RiMoneyDollarCircleLine } from '@remixicon/react';
import { RevenueStats } from '@@types/index';
import { formatCurrency, formatNumber } from '@utils/formatNumber';
import StatCard from './StatCard';
import StatCardIcon from './StatCardIcon';
import StatGrid from './StatGrid';
import SectionTitle from './SectionTitle';

interface RevenueStatsSectionProps {
  revenue: RevenueStats;
}

function RevenueStatsSection({ revenue }: RevenueStatsSectionProps) {
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
      </StatGrid>
    </div>
  );
}

export default RevenueStatsSection;
