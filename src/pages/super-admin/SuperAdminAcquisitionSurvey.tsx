import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { RiCloseLine } from '@remixicon/react';
import { match } from 'ts-pattern';
import styled from '@emotion/styled';
import AppContainer from '@components/common/container/AppContainer';
import PageHeader from '@components/common/page/PageHeader';
import Pagination from '@components/common/pagination/Pagination';
import SuperAdminPageContainer from '@components/super-admin/SuperAdminPageContainer';
import SurveyChannelFilter from '@components/super-admin/acquisition-survey/SurveyChannelFilter';
import SurveyChannelSection from '@components/super-admin/acquisition-survey/SurveyChannelSection';
import SurveyCsvDownloadButton from '@components/super-admin/acquisition-survey/SurveyCsvDownloadButton';
import SurveyResponseList from '@components/super-admin/acquisition-survey/SurveyResponseList';
import SurveyResponseRateSection from '@components/super-admin/acquisition-survey/SurveyResponseRateSection';
import SurveySchoolTable from '@components/super-admin/acquisition-survey/SurveySchoolTable';
import SectionTitle from '@components/super-admin/dashboard/SectionTitle';
import useSuperAdminAcquisitionSurvey from '@hooks/super-admin/useSuperAdminAcquisitionSurvey';
import { AcquisitionSurveyResponse, AcquisitionSurveySummary } from '@@types/acquisitionSurvey';
import { PaginationResponse } from '@@types/index';
import { defaultPaginationValue } from '@@types/defaultValues';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';
import { ACQUISITION_CHANNEL_ORDER, AcquisitionChannel } from '@utils/acquisitionChannel';

const PAGE_SIZE = 20;
const CHANNEL_PARAM = 'channel';
const PAGE_PARAM = 'page';
const SCHOOL_PARAM = 'school';

const LoadingText = styled.div`
  font-size: 14px;
  color: ${Color.GREY};
  text-align: center;
  padding: 60px 0;
`;

const BreakdownRow = styled.div`
  width: 100%;
  gap: 20px;
  align-items: flex-start;
  ${rowFlex()}

  ${mobileMediaQuery} {
    flex-direction: column;
  }
`;

const BreakdownColumn = styled.div`
  flex: 1;
  min-width: 0;
  width: 100%;
  ${colFlex()}
`;

const ResponsesSection = styled.div`
  gap: 12px;
  ${colFlex()}
`;

const ResponsesHeader = styled.div`
  gap: 8px;
  flex-wrap: wrap;
  ${rowFlex({ align: 'center' })}
`;

const ResponsesTitle = styled(SectionTitle)`
  margin: 0;
`;

const SchoolClearButton = styled.button`
  height: 26px;
  padding: 0 8px 0 10px;
  border: 1px solid ${Color.KIO_ORANGE};
  border-radius: 14px;
  background: ${Color.KIO_ORANGE_FAINT};
  color: ${Color.KIO_ORANGE_DARK};
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  gap: 2px;
  ${rowFlex({ align: 'center' })}
`;

function parseChannel(value: string | null): AcquisitionChannel | null {
  return ACQUISITION_CHANNEL_ORDER.find((channel) => channel === value) ?? null;
}

function SuperAdminAcquisitionSurvey() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [summary, setSummary] = useState<AcquisitionSurveySummary | null>(null);
  const [responses, setResponses] = useState<PaginationResponse<AcquisitionSurveyResponse>>(defaultPaginationValue);
  const { fetchSummary, fetchResponses } = useSuperAdminAcquisitionSurvey();

  const page = Number(searchParams.get(PAGE_PARAM));
  const channel = parseChannel(searchParams.get(CHANNEL_PARAM));
  const school = searchParams.get(SCHOOL_PARAM) || null;

  useEffect(() => {
    fetchSummary().then(setSummary);
  }, [fetchSummary]);

  useEffect(() => {
    fetchResponses(page, PAGE_SIZE, channel, school).then((result) => setResponses(result ?? defaultPaginationValue));
  }, [fetchResponses, page, channel, school]);

  const handlePageChange = (nextPage: number) => {
    searchParams.set(PAGE_PARAM, nextPage.toString());
    setSearchParams(searchParams);
  };

  const handleChannelSelect = (nextChannel: AcquisitionChannel | null) => {
    searchParams.delete(PAGE_PARAM);
    if (nextChannel) {
      searchParams.set(CHANNEL_PARAM, nextChannel);
    } else {
      searchParams.delete(CHANNEL_PARAM);
    }
    setSearchParams(searchParams);
  };

  const handleSchoolSelect = (nextSchool: string | null) => {
    searchParams.delete(PAGE_PARAM);
    if (nextSchool) {
      searchParams.set(SCHOOL_PARAM, nextSchool);
    } else {
      searchParams.delete(SCHOOL_PARAM);
    }
    setSearchParams(searchParams);
  };

  const selectedSchool = summary?.schools.find((stat) => stat.schoolName === school) ?? null;

  const surveyedCount = summary ? summary.answeredCount + summary.skippedCount : 0;

  const fetchAllResponses = () => fetchResponses(0, surveyedCount, null, null).then((result) => result?.content ?? null);

  return (
    <AppContainer useFlex={colFlex({ align: 'center' })} useTitle={false}>
      <SuperAdminPageContainer>
        <PageHeader
          title="유입 경로 설문"
          description="어드민 홈 설문으로 수집한 유입 경로와 유입 추적값(UTM·referrer)을 확인합니다. 학교는 가입 이메일 도메인으로 묶고, 학교를 누르면 분포와 응답 목록이 그 학교로 좁혀집니다."
          actions={<SurveyCsvDownloadButton disabled={surveyedCount === 0} fetchAllResponses={fetchAllResponses} />}
        />
        {match(summary)
          .with(null, () => <LoadingText>불러오는 중...</LoadingText>)
          .otherwise((data) => (
            <>
              <SurveyResponseRateSection summary={data} />
              <BreakdownRow>
                <BreakdownColumn>
                  <SectionTitle>학교별 응답</SectionTitle>
                  <SurveySchoolTable schools={data.schools} selected={school} onSelect={handleSchoolSelect} />
                </BreakdownColumn>
                <BreakdownColumn>
                  <SurveyChannelSection channels={selectedSchool?.channels ?? data.channels} schoolName={selectedSchool?.schoolName ?? null} />
                </BreakdownColumn>
              </BreakdownRow>
            </>
          ))}
        <ResponsesSection>
          <ResponsesHeader>
            <ResponsesTitle>개별 응답 ({responses.totalElements}건)</ResponsesTitle>
            {school && (
              <SchoolClearButton type="button" onClick={() => handleSchoolSelect(null)} aria-label={`${school} 선택 해제`}>
                {school}
                <RiCloseLine size={14} />
              </SchoolClearButton>
            )}
          </ResponsesHeader>
          <SurveyChannelFilter selected={channel} onSelect={handleChannelSelect} />
          <SurveyResponseList responses={responses.content} />
          <Pagination totalPageCount={responses.totalPages} paginateFunction={handlePageChange} />
        </ResponsesSection>
      </SuperAdminPageContainer>
    </AppContainer>
  );
}

export default SuperAdminAcquisitionSurvey;
