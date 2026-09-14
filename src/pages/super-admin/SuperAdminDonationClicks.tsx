import { useEffect, useState } from 'react';
import { Location, useLocation } from 'react-router-dom';
import { useSetAtom } from 'jotai';
import { match } from 'ts-pattern';
import styled from '@emotion/styled';
import AppContainer from '@components/common/container/AppContainer';
import RightSidebarModal from '@components/common/modal/RightSidebarModal';
import PageHeader from '@components/common/page/PageHeader';
import SuperAdminPageContainer from '@components/super-admin/SuperAdminPageContainer';
import MonthCalendarGrid, { MonthCalendarDay } from '@components/super-admin/dashboard/MonthCalendarGrid';
import SectionTitle from '@components/super-admin/dashboard/SectionTitle';
import DonationClickBreakdownSection from '@components/super-admin/donation-clicks/DonationClickBreakdownSection';
import DonationClickCalendarCell from '@components/super-admin/donation-clicks/DonationClickCalendarCell';
import DonationClickDayDetail from '@components/super-admin/donation-clicks/DonationClickDayDetail';
import DonationClickSummarySection from '@components/super-admin/donation-clicks/DonationClickSummarySection';
import DonationClickWorkspaceSection from '@components/super-admin/donation-clicks/DonationClickWorkspaceSection';
import useSuperAdminDonationClicks from '@hooks/super-admin/useSuperAdminDonationClicks';
import { externalSidebarAtom } from '@jotai/atoms';
import { CustomerDonationClickStats, DonationClickDailyPoint } from '@@types/donationClick';
import { RIGHT_SIDEBAR_ACTION } from '@@types/index';
import { SUPER_ADMIN_ROUTES } from '@constants/routes';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';
import { formatDateToYmd } from '@utils/formatDate';
import { formatCurrency, formatNumber } from '@utils/formatNumber';

const FIRST_MONTH = 1;
const LAST_MONTH = 12;

const Sections = styled.div`
  width: 100%;
  gap: 24px;
  ${colFlex()}

  ${mobileMediaQuery} {
    gap: 18px;
  }
`;

const Section = styled.div``;

const DetailRow = styled.div`
  width: 100%;
  gap: 20px;
  align-items: flex-start;
  ${rowFlex()}

  ${mobileMediaQuery} {
    flex-direction: column;
  }
`;

const DetailColumn = styled.div`
  flex: 1;
  min-width: 0;
  ${colFlex()}
`;

const LoadingText = styled.div`
  font-size: 14px;
  color: ${Color.GREY};
  text-align: center;
  padding: 60px 0;
  word-break: keep-all;
`;

function findBusiestDate(daily: DonationClickDailyPoint[]): string | null {
  const busiest = daily.reduce<DonationClickDailyPoint | null>((max, point) => {
    if (point.clicks === 0) return max;
    if (!max || point.clicks > max.clicks) return point;
    return max;
  }, null);
  return busiest?.date ?? null;
}

function SuperAdminDonationClicks() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [stats, setStats] = useState<CustomerDonationClickStats | null>(null);
  const { fetchClickStats } = useSuperAdminDonationClicks();
  const setExternalSidebar = useSetAtom(externalSidebarAtom);
  const location = useLocation();

  useEffect(() => {
    setStats(null);
    const startDate = formatDateToYmd(new Date(year, month - 1, 1));
    const endDate = formatDateToYmd(new Date(year, month, 0));
    fetchClickStats(startDate, endDate).then(setStats);
  }, [year, month, fetchClickStats]);

  const handlePrevMonth = () => {
    if (month === FIRST_MONTH) {
      setYear((y) => y - 1);
      setMonth(LAST_MONTH);
    } else {
      setMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (month === LAST_MONTH) {
      setYear((y) => y + 1);
      setMonth(FIRST_MONTH);
    } else {
      setMonth((m) => m + 1);
    }
  };

  const handleDayClick = (point: DonationClickDailyPoint) => {
    setExternalSidebar({
      action: RIGHT_SIDEBAR_ACTION.OPEN,
      location,
      title: point.date,
      subtitle: `클릭 ${formatNumber(point.clicks)}회 · 토스 ${formatCurrency(point.amountSum)}`,
      content: <DonationClickDayDetail key={point.date} date={point.date} />,
    });
  };

  return (
    <AppContainer useFlex={colFlex({ align: 'center' })} useTitle={false}>
      <SuperAdminPageContainer>
        <PageHeader
          title="후원 클릭 현황"
          description="주문 완료 화면 후원 모달의 송금 버튼 클릭을 달력에서 확인합니다. 날짜는 영업일(09:00 ~ 익일 08:59) 기준이며, 날짜를 누르면 그날의 상세를 봅니다."
        />
        {match(stats)
          .with(null, () => <LoadingText>후원 클릭 현황 불러오는 중...</LoadingText>)
          .otherwise((loaded) => {
            const dailyByDate = new Map(loaded.daily.map((point) => [point.date, point]));
            const renderDay = ({ day, dateStr, isToday }: MonthCalendarDay) => {
              const point = dailyByDate.get(dateStr) ?? null;
              return <DonationClickCalendarCell day={day} isToday={isToday} point={point} onClick={() => point && handleDayClick(point)} />;
            };

            return (
              <Sections>
                <Section>
                  <SectionTitle>월별 요약</SectionTitle>
                  <DonationClickSummarySection summary={loaded.summary} busiestDate={findBusiestDate(loaded.daily)} />
                </Section>
                <MonthCalendarGrid
                  year={year}
                  month={month}
                  onPrevMonth={handlePrevMonth}
                  onNextMonth={handleNextMonth}
                  onYearChange={setYear}
                  onMonthChange={setMonth}
                  renderDay={renderDay}
                />
                <DetailRow>
                  <DetailColumn>
                    <DonationClickBreakdownSection stats={loaded} />
                  </DetailColumn>
                  <DetailColumn>
                    <DonationClickWorkspaceSection items={loaded.topWorkspaces} />
                  </DetailColumn>
                </DetailRow>
              </Sections>
            );
          })}
      </SuperAdminPageContainer>
      <RightSidebarModal useExternalControl={{ location: { pathname: SUPER_ADMIN_ROUTES.DONATION_CLICKS } as Location }} />
    </AppContainer>
  );
}

export default SuperAdminDonationClicks;
