import { useCallback, useEffect, useState } from 'react';
import { match } from 'ts-pattern';
import styled from '@emotion/styled';
import { subDays } from 'date-fns';
import AppContainer from '@components/common/container/AppContainer';
import PageHeader from '@components/common/page/PageHeader';
import SuperAdminPageContainer from '@components/super-admin/SuperAdminPageContainer';
import DonationClickBreakdownSection from '@components/super-admin/donation-clicks/DonationClickBreakdownSection';
import DonationClickDailyChart from '@components/super-admin/donation-clicks/DonationClickDailyChart';
import DonationClickDateFilter from '@components/super-admin/donation-clicks/DonationClickDateFilter';
import DonationClickSummarySection from '@components/super-admin/donation-clicks/DonationClickSummarySection';
import DonationClickWorkspaceSection from '@components/super-admin/donation-clicks/DonationClickWorkspaceSection';
import useSuperAdminDonationClicks from '@hooks/super-admin/useSuperAdminDonationClicks';
import { CustomerDonationClickStats } from '@@types/donationClick';
import { Color } from '@resources/colors';
import { colFlex } from '@styles/flexStyles';
import { formatDateToYmd } from '@utils/formatDate';

const DEFAULT_RANGE_DAYS = 29;

const LoadingText = styled.div`
  font-size: 14px;
  color: ${Color.GREY};
  text-align: center;
  padding: 60px 0;
`;

function SuperAdminDonationClicks() {
  const [startDate, setStartDate] = useState<Date>(() => subDays(new Date(), DEFAULT_RANGE_DAYS));
  const [endDate, setEndDate] = useState<Date>(() => new Date());
  const [stats, setStats] = useState<CustomerDonationClickStats | null>(null);
  const { fetchClickStats } = useSuperAdminDonationClicks();

  useEffect(() => {
    setStats(null);
    fetchClickStats(formatDateToYmd(startDate), formatDateToYmd(endDate)).then(setStats);
  }, [fetchClickStats, startDate, endDate]);

  const handleRangeChange = useCallback((nextStart: Date, nextEnd: Date) => {
    setStartDate(nextStart);
    setEndDate(nextEnd);
  }, []);

  return (
    <AppContainer useFlex={colFlex({ align: 'center' })} useTitle={false}>
      <SuperAdminPageContainer>
        <PageHeader title="후원 클릭 현황" description="주문 완료 화면 후원 모달의 송금 버튼 클릭을 기간별로 확인합니다." />
        <DonationClickDateFilter startDate={startDate} endDate={endDate} onChange={handleRangeChange} />
        {match(stats)
          .with(null, () => <LoadingText>불러오는 중...</LoadingText>)
          .otherwise((data) => (
            <>
              <DonationClickSummarySection summary={data.summary} />
              <DonationClickDailyChart daily={data.daily} />
              <DonationClickBreakdownSection stats={data} />
              <DonationClickWorkspaceSection items={data.topWorkspaces} />
            </>
          ))}
      </SuperAdminPageContainer>
    </AppContainer>
  );
}

export default SuperAdminDonationClicks;
