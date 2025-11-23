import { useState, useEffect, useReducer, Dispatch } from 'react';
import { setHours, setMinutes, subHours, subDays, subWeeks, subMonths } from 'date-fns';
import { isRangeCategory } from '@@types/guard';
import { InputState, InputAction, RangeCategory } from '@@types/datePicker';
import { parseDateInput } from '@utils/formatDate';
import { isStartAfterEnd, adjustDateRange, adjustDateRangeWithZeroTime, formatDateRange } from '@utils/dateValidation';

const inputReducer = (state: InputState, action: InputAction): InputState => {
  switch (action.type) {
    case 'SET_START_DATE':
      return { ...state, startDateInput: action.payload };
    case 'SET_END_DATE':
      return { ...state, endDateInput: action.payload };
    case 'SET_START_TIME':
      return { ...state, startTimeInput: action.payload };
    case 'SET_END_TIME':
      return { ...state, endTimeInput: action.payload };
    case 'SET_ALL':
      return {
        startDateInput: action.payload.startDate,
        endDateInput: action.payload.endDate,
        startTimeInput: action.payload.startTime,
        endTimeInput: action.payload.endTime,
      };
    case 'RESET_TIME':
      if (action.target === 'BOTH') {
        return { ...state, startTimeInput: '00:00', endTimeInput: '00:00' };
      }
      return action.target === 'START' ? { ...state, startTimeInput: '00:00' } : { ...state, endTimeInput: '00:00' };
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
    let newEnd = now;

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

    setStartDate(start);
    setEndDate(end);

    if (start && end) {
      setRangeCategory('CUSTOM');
    }
  };

  const handleManualDateInput = (event: React.ChangeEvent<HTMLInputElement>, type: 'START' | 'END') => {
    const val = event.target.value;
    dispatch({ type: type === 'START' ? 'SET_START_DATE' : 'SET_END_DATE', payload: val });

    const parsed = parseDateInput(val);
    if (!parsed) return;

    const newDate = setHours(setMinutes(parsed, 0), 0);

    if (type === 'START') {
      setStartDate(newDate);
      dispatch({ type: 'RESET_TIME', target: 'START' });
      setRangeCategory('CUSTOM');

      if (endDate && isStartAfterEnd(newDate, endDate)) {
        setEndDate(newDate);
        dispatch({
          type: 'SET_ALL',
          payload: adjustDateRangeWithZeroTime(newDate),
        });
      }
    } else {
      setEndDate(newDate);
      dispatch({ type: 'RESET_TIME', target: 'END' });
      setRangeCategory('CUSTOM');

      if (startDate && isStartAfterEnd(startDate, newDate)) {
        setStartDate(newDate);
        dispatch({
          type: 'SET_ALL',
          payload: adjustDateRangeWithZeroTime(newDate),
        });
      }
    }
  };

  const handleTimeChange = (type: 'START' | 'END', timeStr: string) => {
    const [hours, minutes] = timeStr.split(':').map(Number);

    dispatch({ type: type === 'START' ? 'SET_START_TIME' : 'SET_END_TIME', payload: timeStr });

    if (type === 'START' && startDate) {
      const newDate = setHours(setMinutes(startDate, minutes), hours);
      setStartDate(newDate);

      if (endDate && isStartAfterEnd(newDate, endDate)) {
        setEndDate(newDate);
        dispatch({
          type: 'SET_ALL',
          payload: adjustDateRange(newDate, timeStr),
        });
      }
    } else if (type === 'END' && endDate) {
      const newDate = setHours(setMinutes(endDate, minutes), hours);
      setEndDate(newDate);

      if (startDate && isStartAfterEnd(startDate, newDate)) {
        setStartDate(newDate);
        dispatch({
          type: 'SET_ALL',
          payload: adjustDateRange(newDate, timeStr),
        });
      }
    }

    setRangeCategory('CUSTOM');
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
