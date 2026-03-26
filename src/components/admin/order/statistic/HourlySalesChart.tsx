import styled from '@emotion/styled';
import { Bar, Line, ComposedChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { HourlySales } from '@@types/index';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';

const ChartContainer = styled.div`
  width: 100%;
  height: 400px;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  padding: 12px;
  box-sizing: border-box;
`;

const FallbackContainer = styled.div`
  width: 100%;
  height: 400px;
  padding-top: 12px;
  font-size: 12px;
  color: #939393;
  font-weight: 500;
  ${colFlex({ justify: 'start', align: 'start' })};
`;

const Legend = styled.div`
  gap: 12px;
  padding-top: 12px;
  font-size: 12px;
  color: #000;
  ${rowFlex({ align: 'center' })};
`;

const LegendItem = styled.div`
  gap: 6px;
  ${rowFlex({ align: 'center' })};
`;

const LegendLine = styled.div<{ color: string }>`
  width: 17px;
  height: 0;
  border-top: 2px solid ${({ color }) => color};
`;

const LegendSquare = styled.div<{ color: string }>`
  width: 12px;
  height: 12px;
  border-radius: 2px;
  background-color: ${({ color }) => color};
`;

const LegendTitle = styled.span``;

const xAxisFormatter = (hour: number) => `${hour}시`;

const revenueYAxisFormatter = (value: number) => (value >= 10000 ? `${(value / 10000).toFixed(0)}만원` : `${value.toLocaleString()}원`);

const orderCountYAxisFormatter = (value: number) => `${value}건`;

interface HourlySalesChartProps {
  salesByHour: HourlySales[];
}

function HourlySalesChart({ salesByHour }: HourlySalesChartProps) {
  const hasData = salesByHour.some((item) => item.revenue > 0 || item.orderCount > 0);

  if (!hasData) {
    return <FallbackContainer>시간대별 매출 데이터가 없습니다.</FallbackContainer>;
  }

  return (
    <>
      <ChartContainer>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={salesByHour} margin={{ top: 5, right: 60, left: 60, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="hour" tickFormatter={xAxisFormatter} />
            <YAxis yAxisId="revenue" tickFormatter={revenueYAxisFormatter} />
            <YAxis yAxisId="orderCount" orientation="right" tickFormatter={orderCountYAxisFormatter} />
            <Tooltip
              labelFormatter={(hour) => `${hour}시`}
              formatter={(value: number, name: string) => {
                if (name === 'revenue') return [`${value.toLocaleString()}원`, '매출액'];
                return [`${value}건`, '주문 건수'];
              }}
            />
            <Bar yAxisId="revenue" dataKey="revenue" name="revenue" fill={Color.KIO_ORANGE} barSize={20} />
            <Line yAxisId="orderCount" dataKey="orderCount" name="orderCount" stroke={Color.GREEN} strokeWidth={2} dot={false} />
          </ComposedChart>
        </ResponsiveContainer>
      </ChartContainer>
      <Legend>
        <LegendItem>
          <LegendSquare color={Color.KIO_ORANGE} />
          <LegendTitle>시간대별 매출액</LegendTitle>
        </LegendItem>
        <LegendItem>
          <LegendLine color={Color.GREEN} />
          <LegendTitle>시간대별 주문 건수</LegendTitle>
        </LegendItem>
      </Legend>
    </>
  );
}

export default HourlySalesChart;
