import { useState, useReducer, Dispatch, useEffect, SetStateAction } from 'react';
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
  handleDateChange: (dates: [Date, Date]) => void;
  handleManualDateInput: (event: React.ChangeEvent<HTMLInputElement>, type: 'START' | 'END') => void;
  handleTimeChange: (type: 'START' | 'END', timeStr: string) => void;
}
interface UseDateRangeParams {
  startDate: Date;
  endDate: Date;
  setStartDate: Dispatch<SetStateAction<Date>>;
  setEndDate: Dispatch<SetStateAction<Date>>;
}

function useDateRange({ startDate, endDate, setStartDate, setEndDate }: UseDateRangeParams): UseDateRangeReturn {
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

      if (startDate.getTime() === subHours(endDate, 2).getTime()) {
        setRangeCategory('2HOURS');
      } else if (startDate.getTime() === subDays(endDate, 1).getTime()) {
        setRangeCategory('1DAY');
      } else if (startDate.getTime() === subWeeks(endDate, 1).getTime()) {
        setRangeCategory('1WEEK');
      } else if (startDate.getTime() === subMonths(endDate, 1).getTime()) {
        setRangeCategory('1MONTH');
      } else {
        setRangeCategory('CUSTOM');
      }
    }
  }, [startDate, endDate]);

  /**
   * 날짜 범위 카테고리(예: 2시간, 1일 등) 변경 시 호출되는 핸들러
   * 선택된 카테고리에 따라 시작일과 종료일을 자동으로 계산하여 설정합니다.
   */
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

  /**
   * 달력에서 날짜 선택 시 호출되는 핸들러
   * 시작일과 종료일이 같은 경우, 시작일은 00:00:00, 종료일은 23:59:59로 설정합니다.
   */
  const handleDateChange = (dates: [Date, Date]) => {
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

  /**
   * 내부적으로 사용되는 날짜 범위 업데이트 함수
   * 시작일이 종료일보다 늦거나, 종료일이 시작일보다 빠른 경우를 방지하기 위해 날짜를 조정합니다.
   */
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

  /**
   * 날짜 입력 필드(input) 변경 시 호출되는 핸들러
   * 사용자가 직접 날짜를 입력할 때 호출되며, 유효한 날짜 형식인 경우 상태를 업데이트합니다.
   */
  const handleManualDateInput = (event: React.ChangeEvent<HTMLInputElement>, type: 'START' | 'END') => {
    const val = event.target.value;
    const isStart = type === 'START';

    dispatch({ type: isStart ? 'SET_START_DATE' : 'SET_END_DATE', payload: val });

    const parsedDateInput = parseDateInput(val);
    if (!parsedDateInput) return;

    const newDate = isStart ? startOfDay(parsedDateInput) : endOfDay(parsedDateInput);
    updateDateRange(type, newDate);
  };

  /**
   * 시간 선택(select) 변경 시 호출되는 핸들러
   * 선택된 시간을 현재 날짜에 반영하여 업데이트합니다.
   */
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
