import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import useAdminOrder from '@hooks/admin/useAdminOrder';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { Color } from '@resources/colors';
import { colFlex } from '@styles/flexStyles';
import { AxiosResponse } from 'axios';

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
  prefixSumPrice: number;
}

interface OrderPriceStatisticsProps {
  startDate: Date;
  endDate: Date;
}

function OrderPriceStatistics({ startDate, endDate }: OrderPriceStatisticsProps) {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { fetchPreFixSumOrders } = useAdminOrder(workspaceId);
  const [data, setData] = useState<ApiPoint[]>([]);

  const dateConverter = (date: Date) => {
    const zonedDate = toZonedTime(date, 'Asia/Seoul');
    return format(zonedDate, "yyyy-MM-dd'T'HH:mm:ss.SSS");
  };

  const formatDateLabel = (iso: string, pattern: string) => {
    const date = toZonedTime(new Date(iso), 'Asia/Seoul');
    return format(date, pattern);
  };

  useEffect(() => {
    fetchPreFixSumOrders(dateConverter(startDate), dateConverter(endDate))
      .then((res) => {
        const response = res as AxiosResponse<ApiPoint[]>;
        setData(response.data ?? []);
      })
      .catch(console.error);
  }, [workspaceId, startDate, endDate]);

  if (data.length === 0) {
    return <FallbackContainer>해당 기간에 매출 데이터가 없습니다.</FallbackContainer>;
  }

  return (
    <Container>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 60, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timeBucket" tickFormatter={(iso) => formatDateLabel(iso, 'yyyy-MM-dd HH:mm')} tickMargin={10} fontSize={12} />
          <YAxis tickFormatter={(value) => (value >= 10000 ? `${(value / 10000).toFixed(0)}만원` : value.toLocaleString())} />
          <Tooltip labelFormatter={(iso) => formatDateLabel(iso, 'yyyy-MM-dd HH:mm')} formatter={(value: number) => [`${value.toLocaleString()}원`, '매출']} />
          <Legend
            formatter={() => '누적 매출'}
            wrapperStyle={{
              paddingTop: '15px',
            }}
          />
          <Line type="monotone" dataKey="prefixSumPrice" name="누적 매출" stroke={Color.KIO_ORANGE} strokeWidth={2} activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </Container>
  );
}

export default OrderPriceStatistics;
