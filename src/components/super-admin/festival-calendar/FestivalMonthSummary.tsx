import { RiBuilding2Line, RiCalendarCheckLine, RiCalendarLine, RiFileListLine, RiMoneyDollarCircleLine } from '@remixicon/react';
import StatCard from '@components/super-admin/dashboard/StatCard';
import StatCardIcon from '@components/super-admin/dashboard/StatCardIcon';
import StatGrid from '@components/super-admin/dashboard/StatGrid';
import { FestivalMonthSummary as FestivalMonthSummaryType } from '@@types/index';
import { formatCurrency, formatNumber } from '@utils/formatNumber';

interface FestivalMonthSummaryProps {
  summary: FestivalMonthSummaryType;
}

function FestivalMonthSummary({ summary }: FestivalMonthSummaryProps) {
  return (
    <StatGrid>
      <StatCard
        icon={
          <StatCardIcon>
            <RiCalendarLine size={18} />
          </StatCardIcon>
        }
        label="축제 일수"
        value={`${formatNumber(summary.totalFestivalDays)}일`}
        valueSize="md"
      />
      <StatCard
        icon={
          <StatCardIcon>
            <RiBuilding2Line size={18} />
          </StatCardIcon>
        }
        label="참여 대학"
        value={`${formatNumber(summary.uniqueUniversities)}개교`}
        valueSize="md"
      />
      <StatCard
        icon={
          <StatCardIcon>
            <RiFileListLine size={18} />
          </StatCardIcon>
        }
        label="총 주문"
        value={`${formatNumber(summary.totalOrders)}건`}
        valueSize="md"
      />
      <StatCard
        icon={
          <StatCardIcon>
            <RiMoneyDollarCircleLine size={18} />
          </StatCardIcon>
        }
        label="총 매출"
        value={formatCurrency(summary.totalRevenue)}
        valueSize="md"
      />
      <StatCard
        icon={
          <StatCardIcon>
            <RiCalendarCheckLine size={18} />
          </StatCardIcon>
        }
        label="가장 바쁜 날"
        value={summary.busiestDay ?? '-'}
        valueSize="md"
      />
    </StatGrid>
  );
}

export default FestivalMonthSummary;
