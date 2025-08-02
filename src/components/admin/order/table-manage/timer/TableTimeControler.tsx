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

const MinusButton = styled(RiSubtractFill)<{ disabled?: boolean }>`
  width: 20px;
  height: 20px;
  color: ${({ disabled }) => (disabled ? Color.GREY : Color.KIO_ORANGE)};
  background-color: ${Color.WHITE};
  border-radius: 50%;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

const PlusButton = styled(RiAddFill)<{ disabled?: boolean }>`
  width: 20px;
  height: 20px;
  color: ${({ disabled }) => (disabled ? Color.GREY : Color.WHITE)};
  background-color: ${({ disabled }) => (disabled ? Color.LIGHT_GREY : Color.KIO_ORANGE)};
  border-radius: 50%;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

const Input = styled.input<{ disabled?: boolean }>`
  width: 90px;
  text-align: center;
  background: none;
  border: none;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'text')};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  &:focus {
    outline: none;
  }
`;

const Unit = styled.span<{ disabled?: boolean }>`
  font-size: 14px;
  color: ${({ disabled }) => (disabled ? Color.GREY : 'inherit')};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

interface TableTimeControlerProps {
  timeLimit: number;
  handleDecrement: () => void;
  handleIncrement: () => void;
  handleTimeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

function TableTimeControler({ timeLimit, handleDecrement, handleIncrement, handleTimeChange, disabled }: TableTimeControlerProps) {
  return (
    <Container>
      <MinusButton disabled={disabled} onClick={disabled ? undefined : handleDecrement} />
      <InputWrapper>
        <Input type="number" value={timeLimit} onChange={disabled ? undefined : handleTimeChange} disabled={disabled} />
        <Unit disabled={disabled}>분</Unit>
      </InputWrapper>
      <PlusButton disabled={disabled} onClick={disabled ? undefined : handleIncrement} />
    </Container>
  );
}

export default TableTimeControler;
