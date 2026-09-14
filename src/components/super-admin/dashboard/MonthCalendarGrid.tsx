import { Fragment, ReactNode, useEffect, useState } from 'react';
import { RiArrowLeftSLine, RiArrowRightSLine } from '@remixicon/react';
import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';

const MIN_YEAR = 2000;
const MAX_YEAR = 2100;
const DAYS_PER_WEEK = 7;
const MONTHS_PER_YEAR = 12;
const DATE_PAD_LENGTH = 2;
const SUNDAY_INDEX = 0;
const SATURDAY_INDEX = 6;
const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];
const MONTHS = Array.from({ length: MONTHS_PER_YEAR }, (_, i) => i + 1);

const Wrapper = styled.div`
  gap: 16px;
  ${colFlex()}
`;

const Header = styled.div`
  gap: 12px;
  ${rowFlex({ align: 'center', justify: 'space-between' })}
`;

const Controls = styled.div`
  gap: 8px;
  ${rowFlex({ align: 'center' })}
`;

const NavButton = styled.button`
  width: 32px;
  height: 32px;
  border: 1px solid ${Color.HEAVY_GREY};
  border-radius: 8px;
  background: ${Color.WHITE};
  color: ${Color.GREY};
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
  ${rowFlex({ justify: 'center', align: 'center' })}

  &:hover {
    background: ${Color.LIGHT_GREY};
    color: ${Color.BLACK};
  }
`;

const YearInput = styled.input`
  width: 72px;
  height: 32px;
  padding: 0 10px;
  border: 1px solid ${Color.HEAVY_GREY};
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  color: ${Color.BLACK};
  text-align: center;
  outline: none;
  font-family: inherit;

  &:focus {
    border-color: ${Color.KIO_ORANGE};
  }
`;

const MonthSelect = styled.select`
  height: 32px;
  padding: 0 10px;
  border: 1px solid ${Color.HEAVY_GREY};
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  color: ${Color.BLACK};
  background: ${Color.WHITE};
  cursor: pointer;
  outline: none;
  font-family: inherit;

  &:focus {
    border-color: ${Color.KIO_ORANGE};
  }
`;

const WeekdayRow = styled.div`
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  gap: 4px;
`;

const WeekdayLabel = styled.div<{ isWeekend: boolean }>`
  text-align: center;
  font-size: 12px;
  font-weight: 600;
  color: ${({ isWeekend }) => (isWeekend ? Color.KIO_ORANGE : Color.GREY)};
  padding: 4px 0;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  gap: 4px;
`;

export interface MonthCalendarDay {
  day: number | null;
  dateStr: string;
  isToday: boolean;
}

interface MonthCalendarGridProps {
  year: number;
  month: number;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onYearChange: (year: number) => void;
  onMonthChange: (month: number) => void;
  renderDay: (calendarDay: MonthCalendarDay) => ReactNode;
  headerAction?: ReactNode;
}

function buildCalendarDays(year: number, month: number): (number | null)[] {
  const firstDay = new Date(year, month - 1, 1).getDay();
  const daysInMonth = new Date(year, month, 0).getDate();
  const days: (number | null)[] = Array(firstDay).fill(null);
  for (let d = 1; d <= daysInMonth; d++) days.push(d);
  while (days.length % DAYS_PER_WEEK !== 0) days.push(null);
  return days;
}

function toDateStr(year: number, month: number, day: number | null): string {
  if (day === null) return '';
  return `${year}-${String(month).padStart(DATE_PAD_LENGTH, '0')}-${String(day).padStart(DATE_PAD_LENGTH, '0')}`;
}

function MonthCalendarGrid({ year, month, onPrevMonth, onNextMonth, onYearChange, onMonthChange, renderDay, headerAction = null }: MonthCalendarGridProps) {
  const today = new Date();
  const days = buildCalendarDays(year, month);
  const [yearDraft, setYearDraft] = useState(String(year));

  useEffect(() => {
    setYearDraft(String(year));
  }, [year]);

  const commitYear = () => {
    const next = parseInt(yearDraft, 10);
    if (!Number.isNaN(next) && next >= MIN_YEAR && next <= MAX_YEAR && next !== year) {
      onYearChange(next);
    } else {
      setYearDraft(String(year));
    }
  };

  const handleYearKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') (e.target as HTMLInputElement).blur();
  };

  return (
    <Wrapper>
      <Header>
        <Controls>
          <NavButton onClick={onPrevMonth} aria-label="이전 달">
            <RiArrowLeftSLine size={18} />
          </NavButton>
          <YearInput
            type="number"
            min={MIN_YEAR}
            max={MAX_YEAR}
            value={yearDraft}
            onChange={(e) => setYearDraft(e.target.value)}
            onBlur={commitYear}
            onKeyDown={handleYearKeyDown}
          />
          <MonthSelect value={month} onChange={(e) => onMonthChange(Number(e.target.value))}>
            {MONTHS.map((m) => (
              <option key={m} value={m}>
                {m}월
              </option>
            ))}
          </MonthSelect>
          <NavButton onClick={onNextMonth} aria-label="다음 달">
            <RiArrowRightSLine size={18} />
          </NavButton>
        </Controls>
        {headerAction}
      </Header>
      <WeekdayRow>
        {WEEKDAYS.map((w, i) => (
          <WeekdayLabel key={w} isWeekend={i === SUNDAY_INDEX || i === SATURDAY_INDEX}>
            {w}
          </WeekdayLabel>
        ))}
      </WeekdayRow>
      <Grid>
        {days.map((day, idx) => {
          const isToday = day !== null && today.getFullYear() === year && today.getMonth() + 1 === month && today.getDate() === day;
          return <Fragment key={idx}>{renderDay({ day, dateStr: toDateStr(year, month, day), isToday })}</Fragment>;
        })}
      </Grid>
    </Wrapper>
  );
}

export default MonthCalendarGrid;
