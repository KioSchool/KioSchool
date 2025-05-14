import OrderToggleButton from '@components/admin/order/OrderToggleButton';
import styled from '@emotion/styled';
import { rowFlex } from '@styles/flexStyles';
import React from 'react';
import ReactDatePicker from 'react-datepicker';
import { ko } from 'date-fns/locale/ko';
import { Color } from '@resources/colors';

const Container = styled.div`
  gap: 30px;
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

const DatePickerContainer = styled.div`
  ${rowFlex({ align: 'center' })}
`;

const StyledLabel = styled.label`
  padding: 0 12px;
`;

const StyledDatePicker = styled(ReactDatePicker)`
  border-radius: 45px;
  box-sizing: border-box;
  width: 100%;
  height: 37px;
  padding: 0 40px;
  font-size: 16px;

  border: 1px solid rgba(201, 201, 201, 0.5);

  &:focus {
    outline: none;
    caret-color: ${Color.KIO_ORANGE};
  }
`;

interface OrderStatisticsNavBarChildrenProps {
  showServedOrder: boolean;
  setShowServedOrder: React.Dispatch<React.SetStateAction<boolean>>;
  startDate: Date;
  setStartDate: React.Dispatch<React.SetStateAction<Date>>;
  endDate: Date;
  setEndDate: React.Dispatch<React.SetStateAction<Date>>;
}

function OrderStatisticsNavBarChildren({
  showServedOrder,
  setShowServedOrder,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}: OrderStatisticsNavBarChildrenProps) {
  return (
    <Container>
      <DatePickerContainer>
        <StyledDatePicker
          selected={startDate}
          shouldCloseOnSelect
          showTimeSelect={true}
          locale={ko}
          dateFormat={'yyyy.MM.dd - aa hh:mm'}
          onChange={(date: Date) => setStartDate(date)}
        />
        <StyledLabel>~</StyledLabel>
        <StyledDatePicker
          selected={endDate}
          shouldCloseOnSelect
          showTimeSelect={true}
          locale={ko}
          dateFormat={'yyyy.MM.dd - aa hh:mm'}
          onChange={(date: Date) => setEndDate(date)}
        />
      </DatePickerContainer>
      <OrderToggleButton toggleShowServedOrders={setShowServedOrder} label={showServedOrder ? '모든 주문 보기' : '서빙 완료만 보기'} />
    </Container>
  );
}

export default OrderStatisticsNavBarChildren;
