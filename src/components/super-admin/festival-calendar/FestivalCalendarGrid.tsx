import { useEffect, useState } from 'react';
import { RiArrowLeftSLine, RiArrowRightSLine } from '@remixicon/react';
import styled from '@emotion/styled';
import FestivalCalendarCell from './FestivalCalendarCell';
import { FestivalWorkspace } from '@@types/index';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';

const MIN_YEAR = 2000;
const MAX_YEAR = 2100;
const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];
const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);

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
  grid-template-columns: repeat(7, 1fr);
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
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
`;

interface FestivalCalendarGridProps {
  year: number;
  month: number;
  calendar: Record<string, FestivalWorkspace[]>;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onYearChange: (year: number) => void;
  onMonthChange: (month: number) => void;
  onDayClick: (dateStr: string, workspaces: FestivalWorkspace[]) => void;
}

function buildCalendarDays(year: number, month: number): (number | null)[] {
  const firstDay = new Date(year, month - 1, 1).getDay();
  const daysInMonth = new Date(year, month, 0).getDate();
  const days: (number | null)[] = Array(firstDay).fill(null);
  for (let d = 1; d <= daysInMonth; d++) days.push(d);
  while (days.length % 7 !== 0) days.push(null);
  return days;
}

function FestivalCalendarGrid({ year, month, calendar, onPrevMonth, onNextMonth, onYearChange, onMonthChange, onDayClick }: FestivalCalendarGridProps) {
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
      </Header>
      <WeekdayRow>
        {WEEKDAYS.map((w, i) => (
          <WeekdayLabel key={w} isWeekend={i === 0 || i === 6}>
            {w}
          </WeekdayLabel>
        ))}
      </WeekdayRow>
      <Grid>
        {days.map((day, idx) => {
          const dateStr = day !== null ? `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}` : '';
          const workspaces = dateStr ? calendar[dateStr] ?? [] : [];
          const isToday = day !== null && today.getFullYear() === year && today.getMonth() + 1 === month && today.getDate() === day;

          return (
            <FestivalCalendarCell
              key={idx}
              day={day}
              isCurrentMonth={day !== null}
              isToday={isToday}
              workspaces={workspaces}
              onClick={() => onDayClick(dateStr, workspaces)}
            />
          );
        })}
      </Grid>
    </Wrapper>
  );
}

export default FestivalCalendarGrid;
