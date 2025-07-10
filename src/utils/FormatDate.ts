import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { ko } from 'date-fns/locale';

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

export const extractMinFromDate = (date: string) => {
  const createdAtDate = new Date(date.replace(' ', 'T'));
  const currentTime = new Date();
  return Math.floor((currentTime.getTime() - createdAtDate.getTime()) / (1000 * 60));
};

export const dateConverter = (date: Date) => {
  const zonedDate = toZonedTime(date, 'Asia/Seoul');
  return format(zonedDate, "yyyy-MM-dd'T'HH:mm:ss.SSS");
};

export const formatTime = (dateString: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return format(date, 'p', { locale: ko });
};

export const formatRemainingTableTime = (expectedEndAt?: string): string => {
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
    return `${hours}시간 ${minutes}분 남음`;
  }

  return `${minutes}분 남음`;
};

export const formatElapsedTime = (date: string | undefined): string => {
  if (!date) {
    return '-';
  }

  const startDate = new Date(date.replace(' ', 'T'));
  const currentTime = new Date();
  const elapsedMilliseconds = currentTime.getTime() - startDate.getTime();

  if (elapsedMilliseconds < 0) {
    return '0분';
  }

  const totalMinutes = Math.floor(elapsedMilliseconds / (1000 * 60));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours > 0) {
    return `${hours}시간 ${minutes}분`;
  }

  return `${minutes}분`;
};
