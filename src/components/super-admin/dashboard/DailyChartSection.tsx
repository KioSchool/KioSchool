import styled from '@emotion/styled';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { DailyPoint } from '@@types/index';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';
import { formatCurrency, formatNumber } from '@utils/formatNumber';
import SectionTitle from './SectionTitle';

const ChartWrap = styled.div`
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

const TabRow = styled.div`
  gap: 8px;
  ${rowFlex()}
`;

const Tab = styled.button<{ active: boolean }>`
  height: 28px;
  padding: 0 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  border: 1px solid ${({ active }) => (active ? Color.KIO_ORANGE : Color.HEAVY_GREY)};
  background: ${({ active }) => (active ? Color.KIO_ORANGE_FAINT : Color.WHITE)};
  color: ${({ active }) => (active ? Color.KIO_ORANGE_DARK : Color.GREY)};
`;

const ChartLabel = styled.div`
  font-size: 12px;
  color: ${Color.GREY};
  font-weight: 500;
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

type Mode = 'revenue' | 'orders';

interface DailyChartSectionProps {
  data: DailyPoint[];
  mode: Mode;
  onModeChange: (m: Mode) => void;
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  const item = payload[0];
  const isRevenue = item.dataKey === 'revenue';
  const value = isRevenue ? formatCurrency(item.value) : `${formatNumber(item.value)}건`;
  return (
    <TooltipBox>
      <span>{label}</span>
      <b>{value}</b>
    </TooltipBox>
  );
}

function DailyChartSection({ data, mode, onModeChange }: DailyChartSectionProps) {
  const isRevenue = mode === 'revenue';

  const formatted = data.map((d) => ({
    ...d,
    label: d.date.slice(5),
  }));

  return (
    <div>
      <SectionTitle>일별 추이 (최근 30일)</SectionTitle>
      <ChartWrap>
        <TabRow>
          <ChartLabel>지표</ChartLabel>
          <Tab active={isRevenue} onClick={() => onModeChange('revenue')}>
            매출
          </Tab>
          <Tab active={!isRevenue} onClick={() => onModeChange('orders')}>
            주문 수
          </Tab>
        </TabRow>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={formatted} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={Color.KIO_ORANGE} stopOpacity={0.25} />
                <stop offset="95%" stopColor={Color.KIO_ORANGE} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
            <XAxis dataKey="label" tick={{ fontSize: 10, fill: Color.GREY }} tickLine={false} axisLine={false} interval="preserveStartEnd" />
            <YAxis
              tick={{ fontSize: 10, fill: Color.GREY }}
              tickLine={false}
              axisLine={false}
              width={isRevenue ? 60 : 40}
              tickFormatter={(v) => (isRevenue ? `${Math.round(v / 1000)}k` : `${v}`)}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey={mode} stroke={Color.KIO_ORANGE} strokeWidth={2} fill="url(#areaGradient)" dot={false} activeDot={{ r: 4 }} />
          </AreaChart>
        </ResponsiveContainer>
      </ChartWrap>
    </div>
  );
}

export default DailyChartSection;
