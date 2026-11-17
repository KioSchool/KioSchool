import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale';
import styled from '@emotion/styled';
import { datePickerCalendarStyles, datePickerPanelStyles } from '@styles/datePickerStyles';
import CustomDatePickerHeader from './CustomDatePickerHeader';

const Container = styled.div`
  ${datePickerPanelStyles}
`;

const CalendarWrapper = styled.div`
  ${datePickerCalendarStyles}
`;

export interface SingleDatePickerProps {
  mode: 'single';
  selectedDate: Date | null;
  onDateChange: (date: Date) => void;
}

function SingleDatePicker({ selectedDate, onDateChange }: SingleDatePickerProps) {
  return (
    <Container>
      <CalendarWrapper>
        <DatePicker
          selected={selectedDate}
          onChange={(date: Date | null) => {
            if (date) onDateChange(date);
          }}
          inline
          renderCustomHeader={CustomDatePickerHeader}
          locale={ko}
          dateFormat="yyyy년 MM월 dd일"
        />
      </CalendarWrapper>
    </Container>
  );
}

export default SingleDatePicker;
