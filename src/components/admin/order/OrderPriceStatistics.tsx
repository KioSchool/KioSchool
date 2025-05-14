import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import useAdminOrder from '@hooks/admin/useAdminOrder';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { Color } from '@resources/colors';
import { colFlex } from '@styles/flexStyles';
import { OrderStatus } from '@@types/index';

const Container = styled.div`
  width: 100%;
  height: 500px;
  margin-top: 20px;
`;

const FallbackContainer = styled.div`
  width: 100%;
  height: 500px;
  ${colFlex({ justify: 'center', align: 'center' })};
  font-size: 20px;
  color: ${Color.GREY};
  font-weight: 600;
`;

export interface ApiPoint {
  timeBucket: string;
  OrderPrefixSumPrice: number;
}

interface OrderPriceStatisticsProps {
  startDate: string;
  endDate: string;
  status: OrderStatus | undefined;
}

function OrderPriceStatistics({ startDate, endDate, status }: OrderPriceStatisticsProps) {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { fetchPrefixSumOrders } = useAdminOrder(workspaceId);
  const [data, setData] = useState<ApiPoint[]>([]);

  const formatDateLabel = (iso: string, pattern: string) => {
    const date = toZonedTime(new Date(iso), 'Asia/Seoul');
    return format(date, pattern);
  };

  const fetchOrderPriceStatistics = async () => {
    try {
      const response = await fetchPrefixSumOrders({
        startDate,
        endDate,
        status,
      });
      setData(response?.data);
    } catch (error) {
      console.error('누적 매출 데이터 에러: ', error);
    }
  };

  useEffect(() => {
    fetchOrderPriceStatistics();
  }, [startDate, endDate, status]);

  if (data.length === 0) {
    return <FallbackContainer>주문 내역이 없습니다.</FallbackContainer>;
  }

  const CustomizedAxisTick = (props: any) => {
    const { x, y, payload } = props;
    const date = toZonedTime(new Date(payload.value), 'Asia/Seoul');

    return (
      <text x={x} y={y + 10} textAnchor="middle" fontSize={12}>
        <tspan x={x} dy={0}>
          {format(date, 'yyyy-MM-dd')}
        </tspan>
        <tspan x={x} dy={15}>
          {format(date, 'HH:mm')}
        </tspan>
      </text>
    );
  };

  const YAxisFormatter = (value: number) => (value >= 10000 ? `${(value / 10000).toFixed(0)}만원` : `${value.toLocaleString()}원`);

  return (
    <Container>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 60, bottom: 40 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timeBucket" tick={CustomizedAxisTick} tickMargin={10} height={60} />
          <YAxis tickFormatter={YAxisFormatter} />
          <Tooltip
            labelFormatter={(iso) => formatDateLabel(iso, 'yyyy-MM-dd HH:mm')}
            formatter={(value: number) => [`${value.toLocaleString()}원`, '누적 매출']}
          />
          <Legend formatter={() => '누적 매출'} />
          <Line type="monotone" dataKey="prefixSumPrice" name="누적 매출" stroke={Color.KIO_ORANGE} strokeWidth={2} activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </Container>
  );
}

export default OrderPriceStatistics;
