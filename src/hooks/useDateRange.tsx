import { useState, useReducer, Dispatch, useEffect } from 'react';
import { setHours, setMinutes, subHours, subDays, subWeeks, subMonths, startOfDay, endOfDay, isSameDay } from 'date-fns';
import { isRangeCategory } from '@@types/guard';
import { InputState, InputAction, RangeCategory } from '@@types/datePicker';
import { formatDateRange, isStartAfterEnd, parseDateInput } from '@utils/formatDate';

const inputReducer = (state: InputState, action: InputAction): InputState => {
  switch (action.type) {
    case 'SET_START_DATE':
      return { ...state, startDateInput: action.payload };
    case 'SET_END_DATE':
      return { ...state, endDateInput: action.payload };
    case 'SET_ALL':
      return {
        startDateInput: action.payload.startDate,
        endDateInput: action.payload.endDate,
        startTimeInput: action.payload.startTime,
        endTimeInput: action.payload.endTime,
      };
    default:
      return state;
  }
};

interface UseDateRangeReturn {
  startDate: Date | null;
  endDate: Date | null;
  rangeCategory: RangeCategory;
  inputState: InputState;
  dispatch: Dispatch<InputAction>;
  handleRangeCategoryChange: (category: string) => void;
  handleDateChange: (dates: [Date | null, Date | null]) => void;
  handleManualDateInput: (event: React.ChangeEvent<HTMLInputElement>, type: 'START' | 'END') => void;
  handleTimeChange: (type: 'START' | 'END', timeStr: string) => void;
}

function useDateRange(): UseDateRangeReturn {
  const [startDate, setStartDate] = useState<Date | null>(subHours(new Date(), 2));
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [rangeCategory, setRangeCategory] = useState<RangeCategory>('2HOURS');

  const [inputState, dispatch] = useReducer(inputReducer, {
    startDateInput: '',
    endDateInput: '',
    startTimeInput: '00:00',
    endTimeInput: '00:00',
  });

  useEffect(() => {
    if (startDate && endDate) {
      dispatch({
        type: 'SET_ALL',
        payload: formatDateRange(startDate, endDate),
      });
    }
  }, [startDate, endDate]);

  const handleRangeCategoryChange = (category: string) => {
    if (!isRangeCategory(category)) return;

    setRangeCategory(category);

    const now = new Date();
    let newStart = now;
    const newEnd = now;

    switch (category) {
      case '2HOURS':
        newStart = subHours(now, 2);
        break;
      case '1DAY':
        newStart = subDays(now, 1);
        break;
      case '1WEEK':
        newStart = subWeeks(now, 1);
        break;
      case '1MONTH':
        newStart = subMonths(now, 1);
        break;
      case 'CUSTOM':
        return;
    }

    setStartDate(newStart);
    setEndDate(newEnd);
  };

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;

    if (start && end && isSameDay(start, end)) {
      setStartDate(startOfDay(start));
      setEndDate(endOfDay(end));
    } else {
      setStartDate(start);
      setEndDate(end);
    }

    if (start && end) {
      setRangeCategory('CUSTOM');
    }
  };

  const updateDateRange = (type: 'START' | 'END', newDate: Date) => {
    if (type === 'START') {
      setStartDate(newDate);

      if (endDate && isStartAfterEnd(newDate, endDate)) {
        const adjustedEnd = endOfDay(newDate);
        setEndDate(adjustedEnd);
      }
    } else if (type === 'END') {
      setEndDate(newDate);

      if (startDate && isStartAfterEnd(startDate, newDate)) {
        const adjustedStart = startOfDay(newDate);
        setStartDate(adjustedStart);
      }
    }

    setRangeCategory('CUSTOM');
  };

  const handleManualDateInput = (event: React.ChangeEvent<HTMLInputElement>, type: 'START' | 'END') => {
    const val = event.target.value;
    const isStart = type === 'START';

    dispatch({ type: isStart ? 'SET_START_DATE' : 'SET_END_DATE', payload: val });

    const parsedDateInput = parseDateInput(val);
    if (!parsedDateInput) return;

    const newDate = isStart ? startOfDay(parsedDateInput) : endOfDay(parsedDateInput);
    updateDateRange(type, newDate);
  };

  const handleTimeChange = (type: 'START' | 'END', timeStr: string) => {
    const [hours, minutes] = timeStr.split(':').map(Number);

    const isStart = type === 'START';
    const baseDate = isStart ? startDate : endDate;

    if (baseDate) {
      const newDate = setHours(setMinutes(baseDate, minutes), hours);
      updateDateRange(type, newDate);
    }
  };

  return {
    startDate,
    endDate,
    rangeCategory,
    inputState,
    dispatch,
    handleRangeCategoryChange,
    handleDateChange,
    handleManualDateInput,
    handleTimeChange,
  };
}

export default useDateRange;
