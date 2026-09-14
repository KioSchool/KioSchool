import { RiChat3Line, RiCheckboxCircleLine, RiSkipForwardLine, RiUserUnfollowLine } from '@remixicon/react';
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
              <Caption>설문을 본 사람 중 {formatPercent(summary.responseRate)} 응답</Caption>
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
          footer={<Caption>설문 배포 이전 가입자 포함 · 전체 {formatNumber(summary.totalUsers)}명</Caption>}
        />
        <StatCard
          icon={
            <StatCardIcon>
              <RiChat3Line size={ICON_SIZE} />
            </StatCardIcon>
          }
          label="자유 서술 작성"
          value={formatNumber(summary.contextCount)}
        />
      </StatGrid>
    </Section>
  );
}

export default SurveyResponseRateSection;
