import styled from '@emotion/styled';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { DonationClickDailyPoint } from '@@types/donationClick';
import SectionTitle from '@components/super-admin/dashboard/SectionTitle';
import { Color } from '@resources/colors';
import { colFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';
import DonationClickChartTooltip from './DonationClickChartTooltip';

const CHART_HEIGHT = 220;
const MONTH_DAY_START_INDEX = 5;
const AXIS_FONT_SIZE = 10;
const Y_AXIS_WIDTH = 32;
const BAR_RADIUS = 3;

const Section = styled.div``;

const ChartWrap = styled.div`
  background: ${Color.WHITE};
  border: 1px solid #f0f0f0;
  border-radius: 12px;
  padding: 20px;
  ${colFlex()}

  ${mobileMediaQuery} {
    padding: 14px;
    border-radius: 10px;
  }
`;

interface DonationClickDailyChartProps {
  daily: DonationClickDailyPoint[];
}

function DonationClickDailyChart({ daily }: DonationClickDailyChartProps) {
  const data = daily.map((point) => ({ ...point, label: point.date.slice(MONTH_DAY_START_INDEX) }));
  const axisTick = { fontSize: AXIS_FONT_SIZE, fill: Color.GREY };

  return (
    <Section>
      <SectionTitle>일별 클릭</SectionTitle>
      <ChartWrap>
        <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
          <BarChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
            <XAxis dataKey="label" tick={axisTick} tickLine={false} axisLine={false} interval="preserveStartEnd" />
            <YAxis tick={axisTick} tickLine={false} axisLine={false} width={Y_AXIS_WIDTH} allowDecimals={false} />
            <Tooltip content={<DonationClickChartTooltip />} cursor={{ fill: Color.LIGHT_GREY }} />
            <Bar dataKey="clicks" fill={Color.KIO_ORANGE} radius={[BAR_RADIUS, BAR_RADIUS, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartWrap>
    </Section>
  );
}

export default DonationClickDailyChart;
