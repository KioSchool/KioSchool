import { format, subDays, isBefore, setHours, setMinutes, setSeconds, setMilliseconds } from 'date-fns';

export const getBusinessStartDate = (date: Date = new Date()) => {
  const nineAM = setHours(setMinutes(setSeconds(setMilliseconds(new Date(date), 0), 0), 0), 9);
  const businessDate = isBefore(date, nineAM) ? subDays(date, 1) : date;

  return format(businessDate, 'yyyy. MM. dd.');
};
