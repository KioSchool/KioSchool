import { RiCalendarCheckLine, RiCursorLine, RiMoneyDollarCircleLine, RiPercentLine, RiReceiptLine } from '@remixicon/react';
import styled from '@emotion/styled';
import { DonationClickSummary } from '@@types/donationClick';
import StatCard from '@components/super-admin/dashboard/StatCard';
import StatCardIcon from '@components/super-admin/dashboard/StatCardIcon';
import StatGrid from '@components/super-admin/dashboard/StatGrid';
import { Color } from '@resources/colors';
import { formatCurrency, formatNumber, formatPercent } from '@utils/formatNumber';

const ICON_SIZE = 18;

const Caption = styled.div`
  font-size: 12px;
  color: ${Color.GREY};
  line-height: 1.4;
`;

interface DonationClickSummarySectionProps {
  summary: DonationClickSummary;
  busiestDate: string | null;
}

function DonationClickSummarySection({ summary, busiestDate }: DonationClickSummarySectionProps) {
  return (
    <StatGrid>
      <StatCard
        icon={
          <StatCardIcon>
            <RiCursorLine size={ICON_SIZE} />
          </StatCardIcon>
        }
        label="후원 버튼 클릭"
        value={`${formatNumber(summary.totalClicks)}회`}
        footer={<Caption>고유 주문 {formatNumber(summary.uniqueOrders)}건</Caption>}
      />
      <StatCard
        icon={
          <StatCardIcon>
            <RiPercentLine size={ICON_SIZE} />
          </StatCardIcon>
        }
        label="주문 대비 클릭률"
        value={formatPercent(summary.clickRatePerOrder)}
        footer={
          <Caption>
            고유 주문 {formatNumber(summary.uniqueOrders)} / 취소 제외 주문 {formatNumber(summary.ordersInRange)}건 · 모달 재노출 제한이 있어 실제 노출 대비보다
            낮게 나옵니다
          </Caption>
        }
      />
      <StatCard
        icon={
          <StatCardIcon>
            <RiMoneyDollarCircleLine size={ICON_SIZE} />
          </StatCardIcon>
        }
        label="토스 클릭 금액 합계"
        value={formatCurrency(summary.clickedAmountSum)}
        footer={<Caption>계좌이체는 금액을 알 수 없어 제외 · 송금 시도 기준이며 실제 입금액이 아닙니다</Caption>}
      />
      <StatCard
        icon={
          <StatCardIcon>
            <RiReceiptLine size={ICON_SIZE} />
          </StatCardIcon>
        }
        label="평균 선택 금액"
        value={formatCurrency(summary.averageAmount)}
        footer={<Caption>토스 클릭 기준</Caption>}
      />
      <StatCard
        icon={
          <StatCardIcon>
            <RiCalendarCheckLine size={ICON_SIZE} />
          </StatCardIcon>
        }
        label="클릭 가장 많은 날"
        value={busiestDate ?? '-'}
      />
    </StatGrid>
  );
}

export default DonationClickSummarySection;
