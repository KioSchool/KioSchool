import React from 'react';
import styled from '@emotion/styled';
import { RiSubtractFill, RiAddFill } from '@remixicon/react';
import { Color } from '@resources/colors';
import { rowFlex } from '@styles/flexStyles';

const Container = styled.div`
  box-sizing: border-box;
  width: 100%;
  background-color: #f8f8f8;
  border-radius: 50px;
  padding: 5px 2px;
  gap: 10px;
  ${rowFlex({ justify: 'space-between', align: 'center' })};
`;

const InputWrapper = styled.div`
  gap: 2px;
  ${rowFlex({ justify: 'center', align: 'center' })};
`;

const Input = styled.input`
  width: 90px;
  text-align: center;
  background: none;
  border: none;
  &:focus {
    outline: none;
  }
`;

const Unit = styled.span`
  font-size: 14px;
`;

const MinusButton = styled(RiSubtractFill)`
  width: 20px;
  height: 20px;
  color: ${Color.KIO_ORANGE};
  background-color: ${Color.WHITE};
  border-radius: 50%;
  cursor: pointer;
`;

const PlusButton = styled(RiAddFill)`
  width: 20px;
  height: 20px;
  color: ${Color.WHITE};
  background-color: ${Color.KIO_ORANGE};
  border-radius: 50%;
  cursor: pointer;
`;

interface TableTimeControlerProps {
  timeLimit: number;
  handleDecrement: () => void;
  handleIncrement: () => void;
  handleTimeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function TableTimeControler({ timeLimit, handleDecrement, handleIncrement, handleTimeChange }: TableTimeControlerProps) {
  return (
    <Container>
      <MinusButton onClick={handleDecrement} />
      <InputWrapper>
        <Input type="number" value={timeLimit} onChange={handleTimeChange} />
        <Unit>분</Unit>
      </InputWrapper>
      <PlusButton onClick={handleIncrement} />
    </Container>
  );
}

export default TableTimeControler;
