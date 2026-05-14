import { format, subDays, isBefore, setHours, setMinutes, setSeconds, setMilliseconds } from 'date-fns';

export const getBusinessDate = (date: Date = new Date()): Date => {
  const nineAM = setHours(setMinutes(setSeconds(setMilliseconds(new Date(date), 0), 0), 0), 9);
  return isBefore(date, nineAM) ? subDays(date, 1) : date;
};

export const getBusinessStartDate = (date: Date = new Date()) => {
  return format(getBusinessDate(date), 'yyyy. MM. dd.');
};
