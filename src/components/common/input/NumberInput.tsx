import { useState } from 'react';
import styled from '@emotion/styled';
import { RiAddFill, RiSubtractFill } from '@remixicon/react';

import { Color } from '@resources/colors';
import { rowFlex } from '@styles/flexStyles';

const InputContainer = styled.div<{ disabled?: boolean; maxWidth?: string; inputHeight: number }>`
  box-sizing: border-box;
  padding: 2px 4px;
  border-radius: 45px;
  background-color: ${({ disabled }) => (disabled ? Color.BORDER_GREY : Color.WHITE)};
  border: 1px solid ${Color.BORDER_GREY};
  height: ${({ inputHeight }) => inputHeight}px;
  width: 100%;
  max-width: ${({ maxWidth }) => maxWidth || '250px'};
  user-select: none;

  ${rowFlex({ justify: 'space-between', align: 'center' })};
`;

const Input = styled.input<{ disabled?: boolean }>`
  min-width: 50px;
  text-align: center;
  background: none;
  border: none;
  font-size: 13px;
  color: ${({ disabled }) => (disabled ? Color.HEAVY_GREY : Color.TEXT_BODY)};

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
  color: ${({ disabled }) => (disabled ? Color.HEAVY_GREY : Color.KIO_ORANGE)};
  background-color: ${({ disabled }) => (disabled ? Color.BORDER_GREY : Color.WHITE)};
  border: ${({ disabled }) => (disabled ? 'none' : `1px solid ${Color.KIO_ORANGE}`)};
  border-radius: 50%;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  flex-shrink: 0;
`;

const PlusButton = styled(RiAddFill)<{ disabled?: boolean }>`
  width: 18px;
  height: 18px;
  color: ${({ disabled }) => (disabled ? Color.HEAVY_GREY : Color.WHITE)};
  background-color: ${({ disabled }) => (disabled ? Color.BORDER_GREY : Color.KIO_ORANGE)};
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
  height?: number;
}

const DEFAULT_NUMBER_INPUT_HEIGHT = 28;

function NumberInput({
  value,
  formatter,
  onChange,
  onIncrement,
  onDecrement,
  disabled = false,
  readOnly = false,
  maxWidth,
  height = DEFAULT_NUMBER_INPUT_HEIGHT,
}: NumberInputProps) {
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

  // 아이콘 연타(더블클릭) 시 브라우저가 인접 텍스트를 선택하는 것을 막는다
  const preventTextSelection = (e: React.MouseEvent) => {
    e.preventDefault();
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
    <InputContainer disabled={disabled} maxWidth={maxWidth} inputHeight={height}>
      {onDecrement && <MinusButton disabled={disabled} onMouseDown={preventTextSelection} onClick={disabled ? undefined : onDecrement} />}
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
      {onIncrement && <PlusButton disabled={disabled} onMouseDown={preventTextSelection} onClick={disabled ? undefined : onIncrement} />}
    </InputContainer>
  );
}

export default NumberInput;
