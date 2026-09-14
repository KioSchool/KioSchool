import { ReactNode } from 'react';
import MonthCalendarGrid, { MonthCalendarDay } from '@components/super-admin/dashboard/MonthCalendarGrid';
import { FestivalWorkspace } from '@@types/index';
import FestivalCalendarCell from './FestivalCalendarCell';

interface FestivalCalendarGridProps {
  year: number;
  month: number;
  calendar: Record<string, FestivalWorkspace[]>;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onYearChange: (year: number) => void;
  onMonthChange: (month: number) => void;
  onDayClick: (dateStr: string, workspaces: FestivalWorkspace[]) => void;
  headerAction?: ReactNode;
}

function FestivalCalendarGrid({ calendar, onDayClick, ...gridProps }: FestivalCalendarGridProps) {
  const renderDay = ({ day, dateStr, isToday }: MonthCalendarDay) => {
    const workspaces = calendar[dateStr] ?? [];
    return (
      <FestivalCalendarCell day={day} isCurrentMonth={day !== null} isToday={isToday} workspaces={workspaces} onClick={() => onDayClick(dateStr, workspaces)} />
    );
  };

  return <MonthCalendarGrid {...gridProps} renderDay={renderDay} />;
}

export default FestivalCalendarGrid;
