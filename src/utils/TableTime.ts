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
    return `${hours}시간 ${minutes}분 남음`;
  }

  return `${minutes}분 남음`;
};

export const toLocalISOString = (date: Date): string => {
  const pad = (num: number) => num.toString().padStart(2, '0');

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());
  const milliseconds = date.getMilliseconds().toString().padStart(3, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}`;
};

export const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('ko-KR', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
};
