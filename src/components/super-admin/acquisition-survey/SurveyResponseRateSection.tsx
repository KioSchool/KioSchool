import { RiCheckboxCircleLine, RiLinkM, RiSkipForwardLine, RiUserUnfollowLine } from '@remixicon/react';
import styled from '@emotion/styled';
import { AcquisitionSurveySummary } from '@@types/acquisitionSurvey';
import ProgressIndicator from '@components/super-admin/dashboard/ProgressIndicator';
import SectionTitle from '@components/super-admin/dashboard/SectionTitle';
import StatCard from '@components/super-admin/dashboard/StatCard';
import StatCardIcon from '@components/super-admin/dashboard/StatCardIcon';
import StatGrid from '@components/super-admin/dashboard/StatGrid';
import { Color } from '@resources/colors';
import { formatNumber, formatPercent } from '@utils/formatNumber';

const ICON_SIZE = 18;

const Section = styled.div``;

const Caption = styled.div`
  font-size: 12px;
  color: ${Color.GREY};
  line-height: 1.4;
`;

interface SurveyResponseRateSectionProps {
  summary: AcquisitionSurveySummary;
}

function SurveyResponseRateSection({ summary }: SurveyResponseRateSectionProps) {
  return (
    <Section>
      <SectionTitle>응답 현황 (전체 기간)</SectionTitle>
      <StatGrid>
        <StatCard
          icon={
            <StatCardIcon>
              <RiCheckboxCircleLine size={ICON_SIZE} />
            </StatCardIcon>
          }
          label="응답"
          value={formatNumber(summary.answeredCount)}
          footer={
            <>
              <ProgressIndicator rate={summary.responseRate} />
              <Caption>완료·건너뜀 중 응답 {formatPercent(summary.responseRate)}</Caption>
            </>
          }
        />
        <StatCard
          icon={
            <StatCardIcon>
              <RiSkipForwardLine size={ICON_SIZE} />
            </StatCardIcon>
          }
          label="건너뜀"
          value={formatNumber(summary.skippedCount)}
        />
        <StatCard
          icon={
            <StatCardIcon>
              <RiUserUnfollowLine size={ICON_SIZE} />
            </StatCardIcon>
          }
          label="미응답"
          value={formatNumber(summary.notAskedCount)}
          footer={<Caption>아직 설문을 완료·건너뛰지 않은 유저 · 전체 {formatNumber(summary.totalUsers)}명</Caption>}
        />
        <StatCard
          icon={
            <StatCardIcon>
              <RiLinkM size={ICON_SIZE} />
            </StatCardIcon>
          }
          label="유입 추적값 수집"
          value={formatNumber(summary.contextCount)}
          footer={<Caption>UTM 파라미터나 외부 유입 사이트가 기록된 응답</Caption>}
        />
      </StatGrid>
    </Section>
  );
}

export default SurveyResponseRateSection;
