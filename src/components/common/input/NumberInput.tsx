import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { RiAddFill, RiSubtractFill } from '@remixicon/react';
import { rowFlex } from '@styles/flexStyles';
import { useState } from 'react';
import { extractNumbers, parseTimeStringToMinutes } from '@utils/FormatDate';

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
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onValueChange?: (numericValue: number) => void;
  onIncrement?: () => void;
  onDecrement?: () => void;
  disabled?: boolean;
  readOnly?: boolean;
  maxWidth?: string;
  className?: string;
}

function NumberInput({ value, onChange, onValueChange, onIncrement, onDecrement, disabled = false, readOnly = false, maxWidth, className }: NumberInputProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [internalValue, setInternalValue] = useState('');

  const handleFocus = () => {
    if (readOnly || disabled || !onValueChange) return;

    setIsEditing(true);

    // "시간" 또는 "분"이 포함되어 있으면 시간 형식으로 파싱, 아니면 숫자만 추출
    const isTimeFormat = value.includes('시간') || value.includes('분');
    const numericValue = isTimeFormat ? String(parseTimeStringToMinutes(value)) : extractNumbers(value);

    setInternalValue(numericValue);
  };

  const handleBlur = () => {
    if (readOnly || disabled || !onValueChange) return;

    setIsEditing(false);
    const numericValue = Number(internalValue) || 0;

    if (onValueChange) {
      onValueChange(numericValue);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (readOnly || disabled || !onValueChange) return;

    const numericOnly = extractNumbers(e.target.value);
    setInternalValue(numericOnly);

    if (onChange) {
      onChange(e);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.currentTarget.blur();
    }
  };

  const displayValue = isEditing ? internalValue : value;

  return (
    <InputContainer disabled={disabled} maxWidth={maxWidth} className={className}>
      {onDecrement && <MinusButton disabled={disabled} onClick={disabled ? undefined : onDecrement} />}
      <Input
        type="text"
        value={displayValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        readOnly={readOnly || !onValueChange}
      />
      {onIncrement && <PlusButton disabled={disabled} onClick={disabled ? undefined : onIncrement} />}
    </InputContainer>
  );
}

export default NumberInput;
