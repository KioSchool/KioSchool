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

export const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('ko-KR', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
};
