import { ReactDatePickerCustomHeaderProps } from 'react-datepicker';
import styled from '@emotion/styled';
import { getYear, getMonth } from 'date-fns';
import { RiArrowLeftSLine, RiArrowRightSLine } from '@remixicon/react';
import { rowFlex } from '@styles/flexStyles';

const HeaderContainer = styled.div`
  box-sizing: border-box;
  padding: 0;
  width: 100%;
  margin-bottom: 10px;
  font-size: 14px;
  font-weight: 400;
  color: #464a4d;
  ${rowFlex({ justify: 'space-between', align: 'center' })}
`;

const HeaderButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #d1d5d8;
  padding: 0;
  ${rowFlex({ align: 'center' })}

  &:hover {
    color: #464a4d;
  }
`;

const Label = styled.span``;

function CustomDatePickerHeader({ date, decreaseMonth, increaseMonth }: ReactDatePickerCustomHeaderProps) {
  const month = getMonth(date);
  const year = getYear(date);

  return (
    <HeaderContainer>
      <HeaderButton onClick={decreaseMonth}>
        <RiArrowLeftSLine size={16} />
      </HeaderButton>
      <Label>
        {year}년 {month + 1}월
      </Label>
      <HeaderButton onClick={increaseMonth}>
        <RiArrowRightSLine size={16} />
      </HeaderButton>
    </HeaderContainer>
  );
}

export default CustomDatePickerHeader;
