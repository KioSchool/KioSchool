import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
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
import SectionTitle from '@components/super-admin/dashboard/SectionTitle';
import useSuperAdminAcquisitionSurvey from '@hooks/super-admin/useSuperAdminAcquisitionSurvey';
import { AcquisitionSurveyResponse, AcquisitionSurveySummary } from '@@types/acquisitionSurvey';
import { PaginationResponse } from '@@types/index';
import { defaultPaginationValue } from '@@types/defaultValues';
import { Color } from '@resources/colors';
import { colFlex } from '@styles/flexStyles';
import { ACQUISITION_CHANNEL_ORDER, AcquisitionChannel } from '@utils/acquisitionChannel';

const PAGE_SIZE = 20;
const CHANNEL_PARAM = 'channel';
const PAGE_PARAM = 'page';

const LoadingText = styled.div`
  font-size: 14px;
  color: ${Color.GREY};
  text-align: center;
  padding: 60px 0;
`;

const ResponsesSection = styled.div`
  gap: 12px;
  ${colFlex()}
`;

const ResponsesTitle = styled(SectionTitle)`
  margin: 0;
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

  useEffect(() => {
    fetchSummary().then(setSummary);
  }, [fetchSummary]);

  useEffect(() => {
    fetchResponses(page, PAGE_SIZE, channel).then((result) => setResponses(result ?? defaultPaginationValue));
  }, [fetchResponses, page, channel]);

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

  const surveyedCount = summary ? summary.answeredCount + summary.skippedCount : 0;

  const fetchAllResponses = () => fetchResponses(0, surveyedCount, null).then((result) => result?.content ?? null);

  return (
    <AppContainer useFlex={colFlex({ align: 'center' })} useTitle={false}>
      <SuperAdminPageContainer>
        <PageHeader
          title="유입 경로 설문"
          description="회원가입 직후 설문으로 수집한 유입 경로와 자유 서술 응답을 확인합니다."
          actions={<SurveyCsvDownloadButton disabled={surveyedCount === 0} fetchAllResponses={fetchAllResponses} />}
        />
        {match(summary)
          .with(null, () => <LoadingText>불러오는 중...</LoadingText>)
          .otherwise((data) => (
            <>
              <SurveyResponseRateSection summary={data} />
              <SurveyChannelSection channels={data.channels} />
            </>
          ))}
        <ResponsesSection>
          <ResponsesTitle>개별 응답 ({responses.totalElements}건)</ResponsesTitle>
          <SurveyChannelFilter selected={channel} onSelect={handleChannelSelect} />
          <SurveyResponseList responses={responses.content} />
          <Pagination totalPageCount={responses.totalPages} paginateFunction={handlePageChange} />
        </ResponsesSection>
      </SuperAdminPageContainer>
    </AppContainer>
  );
}

export default SuperAdminAcquisitionSurvey;
