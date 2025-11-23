export type RangeCategory = '2HOURS' | '1DAY' | '1WEEK' | '1MONTH' | 'CUSTOM';

export type InputState = {
  startDateInput: string;
  endDateInput: string;
  startTimeInput: string;
  endTimeInput: string;
};

export type InputAction =
  | { type: 'SET_START_DATE'; payload: string }
  | { type: 'SET_END_DATE'; payload: string }
  | { type: 'SET_START_TIME'; payload: string }
  | { type: 'SET_END_TIME'; payload: string }
  | { type: 'SET_ALL'; payload: { startDate: string; endDate: string; startTime: string; endTime: string } }
  | { type: 'RESET_TIME'; target: 'START' | 'END' | 'BOTH' };
