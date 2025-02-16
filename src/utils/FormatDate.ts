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
