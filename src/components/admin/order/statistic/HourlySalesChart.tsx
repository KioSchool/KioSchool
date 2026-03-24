import styled from '@emotion/styled';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { HourlySales } from '@@types/index';
import { Color } from '@resources/colors';
import { colFlex } from '@styles/flexStyles';

const Container = styled.div`
  width: 100%;
  height: 400px;
`;

const FallbackContainer = styled.div`
  width: 100%;
  height: 400px;
  ${colFlex({ justify: 'center', align: 'center' })};
  font-size: 20px;
  color: ${Color.GREY};
  font-weight: 600;
`;

const XAxisFormatter = (hour: number) => `${hour}시`;

const YAxisFormatter = (value: number) => (value >= 10000 ? `${(value / 10000).toFixed(0)}만원` : `${value.toLocaleString()}원`);

interface HourlySalesChartProps {
  salesByHour: HourlySales[];
}

function HourlySalesChart({ salesByHour }: HourlySalesChartProps) {
  const hasData = salesByHour.some((item) => item.revenue > 0 || item.orderCount > 0);

  if (!hasData) {
    return <FallbackContainer>시간대별 매출 데이터가 없습니다.</FallbackContainer>;
  }

  return (
    <Container>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={salesByHour} margin={{ top: 5, right: 30, left: 60, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="hour" tickFormatter={XAxisFormatter} />
          <YAxis tickFormatter={YAxisFormatter} />
          <Tooltip
            labelFormatter={(hour) => `${hour}시`}
            formatter={(value: number, name: string) => {
              if (name === 'revenue') return [`${value.toLocaleString()}원`, '매출'];
              return [`${value}건`, '주문 건수'];
            }}
          />
          <Bar dataKey="revenue" name="revenue" fill={Color.KIO_ORANGE} barSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </Container>
  );
}

export default HourlySalesChart;
