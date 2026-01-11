import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { RiAddFill, RiSubtractFill } from '@remixicon/react';
import { rowFlex } from '@styles/flexStyles';
import { useState } from 'react';

const InputContainer = styled.div<{ disabled?: boolean; maxWidth?: string }>`
  box-sizing: border-box;
  padding: 2px 4px;
  border-radius: 45px;
  background-color: ${({ disabled }) => (disabled ? '#e8eef2' : '#ffffff')};
  border: 1px solid #e8eef2;
  height: 28px;
  width: 100%;
  max-width: ${({ maxWidth }) => maxWidth || '250px'};
  ::selection {
    background: none;
  }

  ${rowFlex({ justify: 'space-between', align: 'center' })};
`;

const Input = styled.input<{ disabled?: boolean }>`
  min-width: 50px;
  text-align: center;
  background: none;
  border: none;
  font-size: 13px;
  color: ${({ disabled }) => (disabled ? '#d1d5d8' : '#464a4d')};

  &:focus {
    outline: none;
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

const MinusButton = styled(RiSubtractFill)<{ disabled?: boolean }>`
  width: 18px;
  height: 18px;
  color: ${({ disabled }) => (disabled ? '#d1d5d8' : Color.KIO_ORANGE)};
  background-color: ${({ disabled }) => (disabled ? '#e8eef2' : Color.WHITE)};
  border: ${({ disabled }) => (disabled ? 'none' : `1px solid ${Color.KIO_ORANGE}`)};
  border-radius: 50%;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  flex-shrink: 0;
`;

const PlusButton = styled(RiAddFill)<{ disabled?: boolean }>`
  width: 18px;
  height: 18px;
  color: ${({ disabled }) => (disabled ? '#d1d5d8' : Color.WHITE)};
  background-color: ${({ disabled }) => (disabled ? '#e8eef2' : Color.KIO_ORANGE)};
  border-radius: 50%;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  flex-shrink: 0;
`;

interface NumberInputProps {
  value: number;
  formatter?: (value: number) => string;
  onChange: (value: number) => void;
  onIncrement?: () => void;
  onDecrement?: () => void;
  disabled?: boolean;
  readOnly?: boolean;
  maxWidth?: string;
}

function NumberInput({ value, formatter, onChange, onIncrement, onDecrement, disabled = false, readOnly = false, maxWidth }: NumberInputProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [internalValue, setInternalValue] = useState(String(value));

  const handleFocus = () => {
    if (readOnly || disabled) return;

    setIsEditing(true);
  };

  const handleBlur = () => {
    if (readOnly || disabled) return;

    setIsEditing(false);
    const numericValue = Number(internalValue) || 0;
    onChange(numericValue);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (readOnly || disabled) return;

    const numericOnly = e.target.value.replace(/[^0-9]/g, '');
    setInternalValue(numericOnly);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.currentTarget.blur();
    }
  };

  const getDisplayValue = (): string => {
    if (isEditing) {
      return internalValue;
    }

    if (formatter) {
      return formatter(value);
    }

    return String(value);
  };

  return (
    <InputContainer disabled={disabled} maxWidth={maxWidth}>
      {onDecrement && <MinusButton disabled={disabled} onClick={disabled ? undefined : onDecrement} />}
      <Input
        type="text"
        value={getDisplayValue()}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        readOnly={readOnly}
      />
      {onIncrement && <PlusButton disabled={disabled} onClick={disabled ? undefined : onIncrement} />}
    </InputContainer>
  );
}

export default NumberInput;
