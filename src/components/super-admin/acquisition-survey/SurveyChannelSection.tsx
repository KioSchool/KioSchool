import styled from '@emotion/styled';
import { AcquisitionChannelStat } from '@@types/acquisitionSurvey';
import RatioBarList from '@components/super-admin/dashboard/RatioBarList';
import SectionTitle from '@components/super-admin/dashboard/SectionTitle';

const Section = styled.div``;

interface SurveyChannelSectionProps {
  channels: AcquisitionChannelStat[];
}

function SurveyChannelSection({ channels }: SurveyChannelSectionProps) {
  const items = [...channels].sort((a, b) => b.count - a.count).map((stat) => ({ key: stat.channel, label: stat.label, count: stat.count, ratio: stat.ratio }));

  return (
    <Section>
      <SectionTitle>유입 경로 분포 (응답 기준)</SectionTitle>
      <RatioBarList items={items} unit="명" />
    </Section>
  );
}

export default SurveyChannelSection;
