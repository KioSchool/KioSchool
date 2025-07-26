import styled from '@emotion/styled';
import { colFlex } from '@styles/flexStyles';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import { Color } from '@resources/colors';
import useFormattedTime from '@hooks/useFormattedTime';
import { formatKoreanTime } from '@utils/FormatDate';

const Container = styled.div`
  border: 1px solid #ececec;
  border-radius: 10px;
  overflow: hidden;
  ${colFlex({ justify: 'start', align: 'center' })}
`;

const Header = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  padding: 5px 10px;
  color: ${Color.GREY};
  background-color: ${Color.LIGHT_GREY};
  font-size: 15px;
  font-weight: 600;
  width: 100%;
  border-bottom: 1px solid #ececec;
  ${colFlex({ justify: 'center', align: 'center' })};
`;

const getMinutesDifference = (startDate: string | undefined, endDate?: string | undefined): number => {
  if (!startDate) return 0;

  const start = new Date(startDate.replace(' ', 'T'));
  const end = endDate ? new Date(endDate.replace(' ', 'T')) : new Date();
  const diffMilliseconds = end.getTime() - start.getTime();

  return Math.max(0, Math.floor(diffMilliseconds / (1000 * 60)));
};

const formatMinutesToTime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (hours > 0) {
    return `${hours}시간 ${remainingMinutes}분`;
  }
  return `${minutes}분`;
};

interface TableUsageTimeProps {
  createdAt: string | undefined;
  expectedEndAt: string | undefined;
}

function TableElapsedTimer({ createdAt, expectedEndAt }: TableUsageTimeProps) {
  const elapsedMinutes = useFormattedTime<number>({
    date: createdAt,
    formatter: () => getMinutesDifference(createdAt),
  });
  const maxMinutes = createdAt && expectedEndAt ? Math.max(1, getMinutesDifference(createdAt, expectedEndAt)) : 60;
  const gaugeValue = Math.min(elapsedMinutes || 0, maxMinutes);

  return (
    <Container>
      <Header>사용시간</Header>
      <Gauge
        width={180}
        height={140}
        value={gaugeValue}
        valueMin={0}
        valueMax={maxMinutes}
        startAngle={-90}
        endAngle={90}
        cornerRadius="50%"
        text={({ value }) => {
          const formattedStartTime = createdAt && formatKoreanTime(createdAt);
          const startTime = formattedStartTime ? `${formattedStartTime}부터` : '시작시간 없음';
          const currentMinutes = value || 0;
          const formattedCurrent = formatMinutesToTime(currentMinutes);
          const formattedMax = formatMinutesToTime(maxMinutes);
          return `${startTime} \n${formattedCurrent} / ${formattedMax}`;
        }}
        sx={{
          [`& .${gaugeClasses.valueText}`]: {
            fontSize: 11,
            fontWeight: 500,
            transform: 'translateY(-10px)',
            textAlign: 'center',
          },
          [`& .${gaugeClasses.valueArc}`]: {
            fill: Color.KIO_ORANGE,
          },
          [`& .${gaugeClasses.referenceArc}`]: {
            fill: Color.LIGHT_GREY,
          },
        }}
      />
    </Container>
  );
}

export default TableElapsedTimer;
