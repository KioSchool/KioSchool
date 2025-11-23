import { useState, useEffect } from 'react';
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
import { RANGE_OPTIONS, TIME_OPTIONS } from '@constants/data/datePickerData';

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

  const [startDateInput, setStartDateInput] = useState('');
  const [endDateInput, setEndDateInput] = useState('');
  const [startTimeInput, setStartTimeInput] = useState('00:00');
  const [endTimeInput, setEndTimeInput] = useState('00:00');

  useEffect(() => {
    if (startDate) {
      setStartDateInput(format(startDate, 'yyyy년 MM월 dd일'));
      setStartTimeInput(format(startDate, 'HH:mm'));
    }
    if (endDate) {
      setEndDateInput(format(endDate, 'yyyy년 MM월 dd일'));
      setEndTimeInput(format(endDate, 'HH:mm'));
    }
  }, [startDate, endDate]);

  const handleRangeCategoryChange = (value: string) => {
    // TODO: 타입 가드 추가
    const category = value as RangeCategory;
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

  const handleManualDateInput = (
    event: React.ChangeEvent<HTMLInputElement>,
    setInput: React.Dispatch<React.SetStateAction<string>>,
    setDate: React.Dispatch<React.SetStateAction<Date | null>>,
    setTimeInput: React.Dispatch<React.SetStateAction<string>>,
    type: 'START' | 'END',
  ) => {
    const val = event.target.value;
    setInput(val);

    const parsed = parseDateInput(val);
    if (parsed) {
      const newDate = setHours(setMinutes(parsed, 0), 0);
      setDate(newDate);
      setTimeInput('00:00');
      setRangeCategory('CUSTOM');

      if (type === 'START' && endDate && newDate > endDate) {
        setEndDate(newDate);
        setEndDateInput(format(newDate, 'yyyy년 MM월 dd일'));
        setEndTimeInput('00:00');
      } else if (type === 'END' && startDate && newDate < startDate) {
        setStartDate(newDate);
        setStartDateInput(format(newDate, 'yyyy년 MM월 dd일'));
        setStartTimeInput('00:00');
      }
    }
  };

  const handleTimeChange = (type: 'START' | 'END', timeStr: string) => {
    const [hours, minutes] = timeStr.split(':').map(Number);

    if (type === 'START') {
      setStartTimeInput(timeStr);
      if (startDate) {
        const newDate = setHours(setMinutes(startDate, minutes), hours);
        setStartDate(newDate);
      }
    } else if (type === 'END') {
      setEndTimeInput(timeStr);
      if (endDate) {
        const newDate = setHours(setMinutes(endDate, minutes), hours);
        setEndDate(newDate);
      }
    }

    setRangeCategory('CUSTOM');
  };

  return (
    <Container>
      <CustomSelect value={rangeCategory} options={RANGE_OPTIONS} onChange={handleRangeCategoryChange} />

      <InputRow>
        <DateInput
          value={startDateInput}
          onChange={(event) => handleManualDateInput(event, setStartDateInput, setStartDate, setStartTimeInput, 'START')}
          placeholder="시작일"
        />
        <CustomSelect value={startTimeInput} options={TIME_OPTIONS} onChange={(val) => handleTimeChange('START', val)} flex="4" />
      </InputRow>

      <InputRow>
        <DateInput
          value={endDateInput}
          onChange={(event) => handleManualDateInput(event, setEndDateInput, setEndDate, setEndTimeInput, 'END')}
          placeholder="종료일"
        />
        <CustomSelect value={endTimeInput} options={TIME_OPTIONS} onChange={(val) => handleTimeChange('END', val)} flex="4" />
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
