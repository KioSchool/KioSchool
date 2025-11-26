import { format, isValid } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import dayjs from 'dayjs';

export const formatDate = (date: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  };
  const formattedDate = new Intl.DateTimeFormat('ko-KR', options).format(new Date(date));

  return formattedDate.replace(/\./g, '.').replace(' ', ' ');
};

export const extractMinFromDate = (date: string | undefined) => {
  if (!date) return 0;
  const createdAtDate = new Date(date.replace(' ', 'T'));
  const currentTime = new Date();
  return Math.floor((currentTime.getTime() - createdAtDate.getTime()) / (1000 * 60));
};

export const dateConverter = (date: Date) => {
  const zonedDate = toZonedTime(date, 'Asia/Seoul');
  return format(zonedDate, "yyyy-MM-dd'T'HH:mm:ss.SSS");
};

export const formatRemainingTime = (expectedEndAt?: string): string => {
  if (!expectedEndAt) {
    return '-';
  }

  const remainingMilliseconds = new Date(expectedEndAt).getTime() - new Date().getTime();

  if (remainingMilliseconds <= 0) {
    return '시간 초과';
  }

  const totalRemainingMinutes = Math.floor(remainingMilliseconds / (1000 * 60));

  const hours = Math.floor(totalRemainingMinutes / 60);
  const minutes = totalRemainingMinutes % 60;

  if (hours > 0) {
    return `${hours}시간 ${minutes}분`;
  }

  return `${minutes}분`;
};

export const formatKoreanTime = (dateString: string): string | null => {
  if (!dateString) return null;

  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };
  return new Intl.DateTimeFormat('ko-KR', options).format(date);
};

export const parseDateInput = (input: string): Date | null => {
  const digits = input.replace(/\D/g, '');
  if (digits.length !== 8) return null;

  const year = parseInt(digits.substring(0, 4));
  const month = parseInt(digits.substring(4, 6)) - 1;
  const day = parseInt(digits.substring(6, 8));

  const date = new Date(year, month, day);
  return isValid(date) ? date : null;
};

/**
 * 두 날짜를 비교하여 시작일이 종료일보다 늦은지 확인
 */
export const isStartAfterEnd = (start: Date, end: Date): boolean => {
  return dayjs(start).isAfter(dayjs(end));
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

export const calculateDuration = (start: Date, end: Date) => {
  const diffMs = end.getTime() - start.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const hours = Math.floor(diffMinutes / 60);
  const minutes = diffMinutes % 60;
  if (hours > 0) {
    return `${hours}시간 ${minutes}분`;
  }
  return `${minutes}분`;
};
