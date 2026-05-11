import styled from '@emotion/styled';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { OnboardingTimeStats } from '@@types/index';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';
import { formatNumber } from '@utils/formatNumber';
import SectionTitle from './SectionTitle';

const Section = styled.div``;

const Card = styled.div`
  background: ${Color.WHITE};
  border: 1px solid #f0f0f0;
  border-radius: 12px;
  padding: 20px;
  gap: 16px;
  ${colFlex()}

  ${mobileMediaQuery} {
    padding: 14px;
    border-radius: 10px;
  }
`;

const StatRow = styled.div`
  gap: 12px;
  ${rowFlex()}

  ${mobileMediaQuery} {
    gap: 8px;
  }
`;

const StatCard = styled.div`
  flex: 1;
  background: #fafafa;
  border: 1px solid #f0f0f0;
  border-radius: 10px;
  padding: 14px 16px;
  gap: 4px;
  ${colFlex()}
`;

const StatLabel = styled.div`
  font-size: 12px;
  color: ${Color.GREY};
`;

const StatValue = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: ${Color.BLACK};
`;

const TooltipBox = styled.div`
  background: ${Color.WHITE};
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 12px;
  color: ${Color.BLACK};
  gap: 2px;
  ${colFlex()}
`;

const TooltipLabel = styled.span``;

const TooltipValue = styled.b``;

const MINUTES_PER_HOUR = 60;
const MINUTES_PER_DAY = 1440;

function formatMinutes(minutes: number): string {
  if (minutes < MINUTES_PER_HOUR) return `${Math.round(minutes)}분`;
  if (minutes < MINUTES_PER_DAY) return `${(minutes / MINUTES_PER_HOUR).toFixed(1)}시간`;
  return `${(minutes / MINUTES_PER_DAY).toFixed(1)}일`;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <TooltipBox>
      <TooltipLabel>{label}</TooltipLabel>
      <TooltipValue>{formatNumber(payload[0].value)}명</TooltipValue>
    </TooltipBox>
  );
}

interface OnboardingTimeSectionProps {
  stats: OnboardingTimeStats;
}

function OnboardingTimeSection({ stats }: OnboardingTimeSectionProps) {
  return (
    <Section>
      <SectionTitle>가입 → 첫 워크스페이스 개설 소요 시간</SectionTitle>
      <Card>
        <StatRow>
          <StatCard>
            <StatLabel>평균</StatLabel>
            <StatValue>{formatMinutes(stats.averageMinutes)}</StatValue>
          </StatCard>
          <StatCard>
            <StatLabel>중앙값</StatLabel>
            <StatValue>{formatMinutes(stats.medianMinutes)}</StatValue>
          </StatCard>
          <StatCard>
            <StatLabel>미개설</StatLabel>
            <StatValue>{formatNumber(stats.neverCreatedCount)}명</StatValue>
          </StatCard>
        </StatRow>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={stats.distribution} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
            <XAxis dataKey="label" tick={{ fontSize: 10, fill: Color.GREY }} tickLine={false} axisLine={false} />
            <YAxis tick={{ fontSize: 10, fill: Color.GREY }} tickLine={false} axisLine={false} width={36} allowDecimals={false} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#fdf3ee' }} />
            <Bar dataKey="count" fill={Color.KIO_ORANGE} radius={[4, 4, 0, 0]} maxBarSize={48} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </Section>
  );
}

export default OnboardingTimeSection;
