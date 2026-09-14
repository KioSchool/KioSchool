import { useEffect, useState } from 'react';
import { match } from 'ts-pattern';
import styled from '@emotion/styled';
import useSuperAdminDonationClicks from '@hooks/super-admin/useSuperAdminDonationClicks';
import { CustomerDonationClickStats } from '@@types/donationClick';
import { Color } from '@resources/colors';
import { colFlex } from '@styles/flexStyles';
import { formatCurrency, formatNumber, formatPercent } from '@utils/formatNumber';
import DonationClickBreakdownSection from './DonationClickBreakdownSection';
import DonationClickWorkspaceSection from './DonationClickWorkspaceSection';

const Container = styled.div`
  gap: 20px;
  ${colFlex()}
`;

const DaySummary = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px 8px;
  padding-bottom: 16px;
  border-bottom: 1px solid #f0f0f0;
`;

const SummaryItem = styled.div`
  gap: 4px;
  min-width: 0;
  ${colFlex()}
`;

const SummaryLabel = styled.div`
  font-size: 11px;
  color: ${Color.GREY};
  word-break: keep-all;
`;

const SummaryValue = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: ${Color.BLACK};
  word-break: keep-all;
`;

const LoadingText = styled.div`
  font-size: 13px;
  color: ${Color.GREY};
  text-align: center;
  padding: 40px 0;
`;

interface DonationClickDayDetailProps {
  date: string;
}

function DonationClickDayDetail({ date }: DonationClickDayDetailProps) {
  const [stats, setStats] = useState<CustomerDonationClickStats | null>(null);
  const { fetchClickStats } = useSuperAdminDonationClicks();

  useEffect(() => {
    fetchClickStats(date, date).then(setStats);
  }, [date, fetchClickStats]);

  return match(stats)
    .with(null, () => <LoadingText>불러오는 중...</LoadingText>)
    .otherwise((data) => (
      <Container>
        <DaySummary>
          <SummaryItem>
            <SummaryLabel>후원 버튼 클릭</SummaryLabel>
            <SummaryValue>{formatNumber(data.summary.totalClicks)}회</SummaryValue>
          </SummaryItem>
          <SummaryItem>
            <SummaryLabel>주문 대비 클릭률</SummaryLabel>
            <SummaryValue>{formatPercent(data.summary.clickRatePerOrder)}</SummaryValue>
          </SummaryItem>
          <SummaryItem>
            <SummaryLabel>고유 주문 / 취소 제외 주문</SummaryLabel>
            <SummaryValue>
              {formatNumber(data.summary.uniqueOrders)} / {formatNumber(data.summary.ordersInRange)}건
            </SummaryValue>
          </SummaryItem>
          <SummaryItem>
            <SummaryLabel>클릭 금액 합계</SummaryLabel>
            <SummaryValue>{formatCurrency(data.summary.clickedAmountSum)}</SummaryValue>
          </SummaryItem>
        </DaySummary>
        <DonationClickBreakdownSection stats={data} />
        <DonationClickWorkspaceSection items={data.topWorkspaces} />
      </Container>
    ));
}

export default DonationClickDayDetail;
