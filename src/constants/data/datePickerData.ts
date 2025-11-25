import { RangeCategory } from '@@types/datePicker';

export const RANGE_OPTIONS: { value: RangeCategory; label: string }[] = [
  { value: '2HOURS', label: '최근 2시간' },
  { value: '1DAY', label: '최근 1일' },
  { value: '1WEEK', label: '최근 1주' },
  { value: '1MONTH', label: '최근 1달' },
  { value: 'CUSTOM', label: '직접 입력' },
];

export const TIME_OPTIONS: { value: string; label: string }[] = [];
for (let i = 0; i < 24; i++) {
  const h = i.toString().padStart(2, '0');
  TIME_OPTIONS.push({ value: `${h}:00`, label: `${h}:00` });
}
