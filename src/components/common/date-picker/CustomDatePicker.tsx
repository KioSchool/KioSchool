import { useState, useEffect, useReducer } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format, setHours, setMinutes, subHours, subDays, subWeeks, subMonths } from 'date-fns';
import { ko } from 'date-fns/locale';
import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { parseDateInput } from '../../../utils/formatDate';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { datePickerStyles } from '@styles/datePickerStyles';
import CustomSelect from '../select/CustomSelect';
import CustomDatePickerHeader from './CustomDatePickerHeader';
import { RangeCategory } from '@@types/index';
import { isRangeCategory } from '@@types/guard';
import { RANGE_OPTIONS, TIME_OPTIONS } from '@constants/data/datePickerData';

type InputState = {
  startDateInput: string;
  endDateInput: string;
  startTimeInput: string;
  endTimeInput: string;
};

type InputAction =
  | { type: 'SET_START_DATE'; payload: string }
  | { type: 'SET_END_DATE'; payload: string }
  | { type: 'SET_START_TIME'; payload: string }
  | { type: 'SET_END_TIME'; payload: string }
  | { type: 'SET_ALL'; payload: { startDate: string; endDate: string; startTime: string; endTime: string } }
  | { type: 'RESET_TIME'; target: 'START' | 'END' | 'BOTH' };

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

const Container = styled.div`
  box-sizing: border-box;
  padding: 24px;
  width: 290px;
  gap: 8px;
  background: #ffffff;
  border: 1px solid #e8eef2;
  border-radius: 8px;
  ${colFlex({ justify: 'start', align: 'start' })}
`;

const InputRow = styled.div`
  gap: 8px;
  width: 100%;
  ${rowFlex()}
`;

const DateInput = styled.input`
  box-sizing: border-box;
  padding: 0 10px;
  flex: 6;
  border: 1px solid #e8eef2;
  border-radius: 4px;
  font-size: 12px;
  color: #464a4d;
  line-height: normal;
  outline: none;

  &:focus {
    border-color: ${Color.KIO_ORANGE};
  }

  &::placeholder {
    color: #aaa;
  }
`;

const CalendarWrapper = styled.div`
  margin-top: 10px;
  width: 100%;
  ${datePickerStyles}
`;

// TODO: startDate, endDate 상태 및 setter들을 props로 받기
const CustomDatePicker = () => {
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
        payload: {
          startDate: format(startDate, 'yyyy년 MM월 dd일'),
          endDate: format(endDate, 'yyyy년 MM월 dd일'),
          startTime: format(startDate, 'HH:mm'),
          endTime: format(endDate, 'HH:mm'),
        },
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
    if (parsed) {
      const newDate = setHours(setMinutes(parsed, 0), 0);

      if (type === 'START') {
        setStartDate(newDate);
        dispatch({ type: 'RESET_TIME', target: 'START' });
        setRangeCategory('CUSTOM');

        if (endDate && newDate > endDate) {
          setEndDate(newDate);
          dispatch({
            type: 'SET_ALL',
            payload: {
              startDate: format(newDate, 'yyyy년 MM월 dd일'),
              endDate: format(newDate, 'yyyy년 MM월 dd일'),
              startTime: '00:00',
              endTime: '00:00',
            },
          });
        }
      } else {
        setEndDate(newDate);
        dispatch({ type: 'RESET_TIME', target: 'END' });
        setRangeCategory('CUSTOM');

        if (startDate && newDate < startDate) {
          setStartDate(newDate);
          dispatch({
            type: 'SET_ALL',
            payload: {
              startDate: format(newDate, 'yyyy년 MM월 dd일'),
              endDate: format(newDate, 'yyyy년 MM월 dd일'),
              startTime: '00:00',
              endTime: '00:00',
            },
          });
        }
      }
    }
  };

  const handleTimeChange = (type: 'START' | 'END', timeStr: string) => {
    const [hours, minutes] = timeStr.split(':').map(Number);

    dispatch({ type: type === 'START' ? 'SET_START_TIME' : 'SET_END_TIME', payload: timeStr });

    if (type === 'START' && startDate) {
      const newDate = setHours(setMinutes(startDate, minutes), hours);
      setStartDate(newDate);
    } else if (type === 'END' && endDate) {
      const newDate = setHours(setMinutes(endDate, minutes), hours);
      setEndDate(newDate);
    }

    setRangeCategory('CUSTOM');
  };

  return (
    <Container>
      <CustomSelect value={rangeCategory} options={RANGE_OPTIONS} onChange={handleRangeCategoryChange} />

      <InputRow>
        <DateInput value={inputState.startDateInput} onChange={(event) => handleManualDateInput(event, 'START')} placeholder="시작일" />
        <CustomSelect value={inputState.startTimeInput} options={TIME_OPTIONS} onChange={(val) => handleTimeChange('START', val)} flex="4" />
      </InputRow>

      <InputRow>
        <DateInput value={inputState.endDateInput} onChange={(event) => handleManualDateInput(event, 'END')} placeholder="종료일" />
        <CustomSelect value={inputState.endTimeInput} options={TIME_OPTIONS} onChange={(val) => handleTimeChange('END', val)} flex="4" />
      </InputRow>

      {rangeCategory !== '2HOURS' && (
        <CalendarWrapper>
          <DatePicker
            selected={startDate}
            onChange={handleDateChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            inline
            renderCustomHeader={CustomDatePickerHeader}
            locale={ko}
            dateFormat="yyyy년 MM월 dd일"
          />
        </CalendarWrapper>
      )}
    </Container>
  );
};

export default CustomDatePicker;
