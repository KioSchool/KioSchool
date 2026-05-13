import { useEffect, useState } from 'react';
import { Location, useLocation } from 'react-router-dom';
import { useSetAtom } from 'jotai';
import styled from '@emotion/styled';
import AppContainer from '@components/common/container/AppContainer';
import PageHeader from '@components/common/page/PageHeader';
import SuperAdminPageContainer from '@components/super-admin/SuperAdminPageContainer';
import RightSidebarModal from '@components/common/modal/RightSidebarModal';
import FestivalCalendarGrid from '@components/super-admin/festival-calendar/FestivalCalendarGrid';
import FestivalMonthSummary from '@components/super-admin/festival-calendar/FestivalMonthSummary';
import FestivalUniversityTable from '@components/super-admin/festival-calendar/FestivalUniversityTable';
import FestivalWorkspaceRankingTable from '@components/super-admin/festival-calendar/FestivalWorkspaceRankingTable';
import FestivalDayDetail from '@components/super-admin/festival-calendar/FestivalDayDetail';
import useSuperAdminFestivalCalendar from '@hooks/super-admin/useSuperAdminFestivalCalendar';
import { externalSidebarAtom } from '@jotai/atoms';
import { FestivalCalendar, FestivalWorkspace, RIGHT_SIDEBAR_ACTION } from '@@types/index';
import { SUPER_ADMIN_ROUTES } from '@constants/routes';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';

const Sections = styled.div`
  gap: 24px;
  width: 100%;
  ${colFlex()}
`;

const SectionLabel = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: ${Color.GREY};
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin-bottom: 8px;
`;

const RankingRow = styled.div`
  gap: 20px;
  width: 100%;
  align-items: flex-start;
  ${rowFlex()}

  ${mobileMediaQuery} {
    flex-direction: column;
  }
`;

const RankingColumn = styled.div`
  flex: 1;
  min-width: 0;
  gap: 8px;
  ${colFlex()}
`;

const LoadingText = styled.div`
  font-size: 14px;
  color: ${Color.GREY};
  text-align: center;
  padding: 60px 0;
`;

function SuperAdminFestivalCalendar() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [data, setData] = useState<FestivalCalendar | null>(null);
  const { fetchFestivalCalendar } = useSuperAdminFestivalCalendar();
  const setExternalSidebar = useSetAtom(externalSidebarAtom);
  const location = useLocation();

  useEffect(() => {
    setData(null);
    fetchFestivalCalendar(year, month).then(setData);
  }, [year, month, fetchFestivalCalendar]);

  const handlePrevMonth = () => {
    if (month === 1) {
      setYear((y) => y - 1);
      setMonth(12);
    } else {
      setMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (month === 12) {
      setYear((y) => y + 1);
      setMonth(1);
    } else {
      setMonth((m) => m + 1);
    }
  };

  const handleYearChange = (newYear: number) => setYear(newYear);
  const handleMonthChange = (newMonth: number) => setMonth(newMonth);

  const handleDayClick = (dateStr: string, workspaces: FestivalWorkspace[]) => {
    if (workspaces.length === 0) return;
    setExternalSidebar({
      action: RIGHT_SIDEBAR_ACTION.OPEN,
      location,
      title: dateStr,
      subtitle: `${workspaces.length}개 주점 운영`,
      content: <FestivalDayDetail workspaces={workspaces} />,
    });
  };

  return (
    <AppContainer useFlex={colFlex({ align: 'center' })} useTitle={false}>
      <SuperAdminPageContainer>
        <PageHeader title="축제 달력" description="주점별 축제 운영 현황을 달력으로 확인합니다. 주문 15건 이상 운영된 주점만 표시됩니다." />
        {data === null ? (
          <LoadingText>불러오는 중...</LoadingText>
        ) : (
          <Sections>
            <div>
              <SectionLabel>월별 요약</SectionLabel>
              <FestivalMonthSummary summary={data.monthSummary} />
            </div>
            <FestivalCalendarGrid
              year={year}
              month={month}
              calendar={data.calendar}
              onPrevMonth={handlePrevMonth}
              onNextMonth={handleNextMonth}
              onYearChange={handleYearChange}
              onMonthChange={handleMonthChange}
              onDayClick={handleDayClick}
            />
            <RankingRow>
              <RankingColumn>
                <SectionLabel>대학별 순위</SectionLabel>
                <FestivalUniversityTable universities={data.universityBreakdown} />
              </RankingColumn>
              <RankingColumn>
                <SectionLabel>주점별 순위</SectionLabel>
                <FestivalWorkspaceRankingTable workspaces={data.workspaceRanking} />
              </RankingColumn>
            </RankingRow>
          </Sections>
        )}
      </SuperAdminPageContainer>
      <RightSidebarModal useExternalControl={{ location: { pathname: SUPER_ADMIN_ROUTES.FESTIVAL_CALENDAR } as Location }} />
    </AppContainer>
  );
}

export default SuperAdminFestivalCalendar;
