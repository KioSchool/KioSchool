import { format } from 'date-fns';

/**
 * 두 날짜를 비교하여 시작일이 종료일보다 늦은지 확인
 */
export const isStartAfterEnd = (start: Date, end: Date): boolean => {
  return start > end;
};

/**
 * 날짜 범위를 조정하여 시작일과 종료일을 같게 만듦
 */
export const adjustDateRange = (date: Date, time: string) => {
  return {
    startDate: format(date, 'yyyy년 MM월 dd일'),
    endDate: format(date, 'yyyy년 MM월 dd일'),
    startTime: time,
    endTime: time,
  };
};

/**
 * 날짜 범위를 00:00 시간으로 초기화
 */
export const adjustDateRangeWithZeroTime = (date: Date) => {
  return adjustDateRange(date, '00:00');
};

/**
 * 날짜를 포맷팅하여 반환
 */
export const formatDateRange = (startDate: Date, endDate: Date) => {
  return {
    startDate: format(startDate, 'yyyy년 MM월 dd일'),
    endDate: format(endDate, 'yyyy년 MM월 dd일'),
    startTime: format(startDate, 'HH:mm'),
    endTime: format(endDate, 'HH:mm'),
  };
};
