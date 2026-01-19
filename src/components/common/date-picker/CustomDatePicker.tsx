import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale';
import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { datePickerStyles } from '@styles/datePickerStyles';
import CustomSelect from '../select/CustomSelect';
import CustomDatePickerHeader from './CustomDatePickerHeader';
import { RANGE_OPTIONS, TIME_OPTIONS } from '@constants/data/datePickerData';
import useDateRange from '@hooks/useDateRange';
import { Dispatch, SetStateAction } from 'react';

const Container = styled.div`
  box-sizing: border-box;
  padding: 24px;
  width: 290px;
  gap: 8px;
  background: #ffffff;
  border: 1px solid #e8eef2;
  border-radius: 8px;
  box-shadow: 0 4px 20px 0 rgba(92, 92, 92, 0.05);
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
  font-family: 'LINE Seed Sans KR', sans-serif;

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

interface CustomDatePickerProps {
  startDate: Date;
  endDate: Date;
  setStartDate: Dispatch<SetStateAction<Date>>;
  setEndDate: Dispatch<SetStateAction<Date>>;
}

const CustomDatePicker = ({ startDate, endDate, setStartDate, setEndDate }: CustomDatePickerProps) => {
  const { rangeCategory, inputState, handleRangeCategoryChange, handleDateChange, handleManualDateInput, handleTimeChange } = useDateRange({
    startDate,
    endDate,
    setStartDate,
    setEndDate,
  });

  return (
    <Container>
      <CustomSelect value={rangeCategory} options={RANGE_OPTIONS} onChange={handleRangeCategoryChange} width={'100%'} />

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
