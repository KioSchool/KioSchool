import styled from '@emotion/styled';
import { colFlex } from '@styles/flexStyles';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import { Color } from '@resources/colors';
import useFormattedTime from '@hooks/useFormattedTime';
import { formatKoreanTime } from '@utils/formatDate';
import { OrderSession } from '@@types/index';
import ToggleButton from '@components/common/toggle/ToggleButton';
import { useTableSession } from '@hooks/admin/useTableSession';

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
  background-color: #f0f5f8;
  font-size: 15px;
  font-weight: 600;
  width: 100%;
  border-bottom: 1px solid #ececec;
  ${colFlex({ justify: 'center', align: 'center' })};
`;

const ToggleContainer = styled.div`
  width: 100%;
  padding: 0 10px 15px 10px;
  box-sizing: border-box;
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
  orderSession: OrderSession | null;
  workspaceId?: string;
  tableNumber?: number;
  refetchTable: () => void;
}

function TableElapsedTimer({ orderSession, workspaceId, tableNumber, refetchTable }: TableUsageTimeProps) {
  const elapsedMinutes = useFormattedTime<number>({
    date: orderSession?.createdAt,
    formatter: () => getMinutesDifference(orderSession?.createdAt),
  });

  const { handleStartSession, handleEndSession } = useTableSession({
    workspaceId,
    currentExpectedEndAt: orderSession?.expectedEndAt,
    orderSessionId: orderSession?.id,
    tableNumber,
    refetchTable,
  });

  const isTableSessionActive = !!orderSession;
  const isSessionLimitActive = !!orderSession?.expectedEndAt;
  const maxMinutes =
    orderSession?.createdAt && orderSession?.expectedEndAt ? Math.max(1, getMinutesDifference(orderSession?.createdAt, orderSession?.expectedEndAt)) : 60;
  const gaugeValue = isSessionLimitActive ? Math.min(elapsedMinutes || 0, maxMinutes) : maxMinutes;

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
          if (!isTableSessionActive) {
            return '테이블 사용 종료됨';
          }

          if (!isSessionLimitActive) {
            return '시간제한 없음';
          }

          const formattedStartTime = orderSession.createdAt && formatKoreanTime(orderSession.createdAt);
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
            fill: isTableSessionActive ? Color.KIO_ORANGE : Color.LIGHT_GREY,
          },
          [`& .${gaugeClasses.referenceArc}`]: {
            fill: Color.LIGHT_GREY,
          },
        }}
      />
      <ToggleContainer>
        <ToggleButton
          checked={isTableSessionActive}
          onChange={(checked) => {
            if (checked) {
              handleStartSession();
            } else {
              handleEndSession();
            }
          }}
          onText="사용중"
          offText="사용종료"
        />
      </ToggleContainer>
    </Container>
  );
}

export default TableElapsedTimer;
