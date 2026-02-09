import { OrderSession } from '@@types/index';
import useFormattedTime from '@hooks/useFormattedTime';
import { formatKoreanTime } from '@utils/formatDate';

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

export default function useElapsedTimer(orderSession: OrderSession | null) {
  const elapsedMinutes = useFormattedTime<number>({
    date: orderSession?.createdAt,
    formatter: () => getMinutesDifference(orderSession?.createdAt),
  });

  const isTableSessionActive = !!orderSession;
  const isSessionLimitActive = !!orderSession?.expectedEndAt;
  const maxMinutes =
    orderSession?.createdAt && orderSession?.expectedEndAt ? Math.max(1, getMinutesDifference(orderSession.createdAt, orderSession.expectedEndAt)) : 60;
  const gaugeValue = isSessionLimitActive ? Math.min(elapsedMinutes || 0, maxMinutes) : maxMinutes;

  const getGaugeText = (value: number | null) => {
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
  };

  return { isTableSessionActive, maxMinutes, gaugeValue, getGaugeText };
}
