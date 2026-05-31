import { useEffect, useState } from 'react';
import { Location, useLocation } from 'react-router-dom';
import { useSetAtom } from 'jotai';
import { match } from 'ts-pattern';
import styled from '@emotion/styled';
import AppContainer from '@components/common/container/AppContainer';
import PageHeader from '@components/common/page/PageHeader';
import SuperAdminPageContainer from '@components/super-admin/SuperAdminPageContainer';
import RightSidebarModal from '@components/common/modal/RightSidebarModal';
import SectionTitle from '@components/super-admin/dashboard/SectionTitle';
import FestivalCalendarGrid from '@components/super-admin/festival-calendar/FestivalCalendarGrid';
import FestivalMonthSummary from '@components/super-admin/festival-calendar/FestivalMonthSummary';
import FestivalUniversityTable from '@components/super-admin/festival-calendar/FestivalUniversityTable';
import FestivalWorkspaceRankingTable from '@components/super-admin/festival-calendar/FestivalWorkspaceRankingTable';
import FestivalDayDetail from '@components/super-admin/festival-calendar/FestivalDayDetail';
import FestivalCsvDownloadButton from '@components/super-admin/festival-calendar/FestivalCsvDownloadButton';
import useSuperAdminFestivalCalendar from '@hooks/super-admin/useSuperAdminFestivalCalendar';
import { externalSidebarAtom } from '@jotai/atoms';
import { FestivalCalendar, FestivalWorkspace, RIGHT_SIDEBAR_ACTION } from '@@types/index';
import { SUPER_ADMIN_ROUTES } from '@constants/routes';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';

const Sections = styled.div`
  width: 100%;
  gap: 24px;
  ${colFlex()}

  ${mobileMediaQuery} {
    gap: 18px;
  }
`;

const Toolbar = styled.div`
  width: 100%;
  ${rowFlex({ justify: 'flex-end', align: 'center' })}
`;

const RankingRow = styled.div`
  width: 100%;
  gap: 20px;
  align-items: flex-start;
  ${rowFlex()}

  ${mobileMediaQuery} {
    flex-direction: column;
  }
`;

const RankingColumn = styled.div`
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

  const refetchCalendar = () => {
    fetchFestivalCalendar(year, month).then(setData);
  };

  const handleDayClick = (dateStr: string, workspaces: FestivalWorkspace[]) => {
    if (workspaces.length === 0) return;
    setExternalSidebar({
      action: RIGHT_SIDEBAR_ACTION.OPEN,
      location,
      title: dateStr,
      subtitle: `${workspaces.length}개 주점 운영`,
      content: <FestivalDayDetail key={dateStr} workspaces={workspaces} onExclusionChanged={refetchCalendar} />,
    });
  };

  return (
    <AppContainer useFlex={colFlex({ align: 'center' })} useTitle={false}>
      <SuperAdminPageContainer>
        <PageHeader
          title="축제 달력"
          description="주점별 축제 운영 현황을 달력에서 확인합니다. 테스트로 보이는 항목은 주점 카드의 제외 버튼으로 숨길 수 있습니다."
        />
        {match(data)
          .with(null, () => <LoadingText>축제 달력 불러오는 중...</LoadingText>)
          .otherwise((loaded) => (
            <Sections>
              <Toolbar>
                <FestivalCsvDownloadButton workspaceRanking={loaded.workspaceRanking} year={year} month={month} />
              </Toolbar>
              <div>
                <SectionTitle>월별 요약</SectionTitle>
                <FestivalMonthSummary summary={loaded.monthSummary} />
              </div>
              <FestivalCalendarGrid
                year={year}
                month={month}
                calendar={loaded.calendar}
                onPrevMonth={handlePrevMonth}
                onNextMonth={handleNextMonth}
                onYearChange={setYear}
                onMonthChange={setMonth}
                onDayClick={handleDayClick}
              />
              <RankingRow>
                <RankingColumn>
                  <SectionTitle>대학별 순위</SectionTitle>
                  <FestivalUniversityTable universities={loaded.universityBreakdown} workspaces={loaded.workspaceRanking} />
                </RankingColumn>
                <RankingColumn>
                  <SectionTitle>주점별 순위</SectionTitle>
                  <FestivalWorkspaceRankingTable workspaces={loaded.workspaceRanking} />
                </RankingColumn>
              </RankingRow>
            </Sections>
          ))}
      </SuperAdminPageContainer>
      <RightSidebarModal useExternalControl={{ location: { pathname: SUPER_ADMIN_ROUTES.FESTIVAL_CALENDAR } as Location }} />
    </AppContainer>
  );
}

export default SuperAdminFestivalCalendar;
