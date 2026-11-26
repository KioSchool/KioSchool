import styled from '@emotion/styled';
import { RiAddFill, RiSubtractFill } from '@remixicon/react';
import { useEffect, useState } from 'react';
import { Color } from '@resources/colors';
import { rowFlex } from '@styles/flexStyles';

const InputContainer = styled.div<{ disabled?: boolean; maxWidth?: string; height?: number }>`
  box-sizing: border-box;
  padding: 2px 4px;
  border-radius: 45px;
  background-color: ${({ disabled }) => (disabled ? Color.BORDER_GREY : '#ffffff')};
  border: 1px solid ${Color.BORDER_GREY};
  height: ${({ height }) => (height ? `${height}px` : '28px')};
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
  color: ${({ disabled }) => (disabled ? Color.DISABLED_GREY : Color.TEXT_DEFAULT)};

  &:focus {
    outline: none;
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

const StepButton = styled.button`
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  padding: 0;
  border-radius: 50%;
  cursor: pointer;
  ${rowFlex({ justify: 'center', align: 'center' })}

  &:disabled {
    border-color: ${Color.BORDER_GREY};
    background: ${Color.BORDER_GREY};
    color: ${Color.DISABLED_GREY};
    cursor: not-allowed;
  }
`;

const MinusButton = styled(StepButton)`
  border: 1px solid ${Color.KIO_ORANGE};
  background: ${Color.WHITE};
  color: ${Color.KIO_ORANGE};
`;

const PlusButton = styled(StepButton)`
  border: 1px solid ${Color.KIO_ORANGE};
  background: ${Color.KIO_ORANGE};
  color: ${Color.WHITE};
`;

const MinusIcon = styled(RiSubtractFill)`
  width: 14px;
  height: 14px;
`;

const PlusIcon = styled(RiAddFill)`
  width: 14px;
  height: 14px;
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
  ariaLabel?: string;
}

function NumberInput({
  value,
  formatter,
  onChange,
  onIncrement,
  onDecrement,
  disabled = false,
  readOnly = false,
  maxWidth,
  height,
  ariaLabel,
}: NumberInputProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [internalValue, setInternalValue] = useState(String(value));

  useEffect(() => {
    if (!isEditing) setInternalValue(String(value));
  }, [isEditing, value]);

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
    <InputContainer disabled={disabled} maxWidth={maxWidth} height={height}>
      {onDecrement && (
        <MinusButton type="button" aria-label="수량 줄이기" disabled={disabled} onMouseDown={preventTextSelection} onClick={onDecrement}>
          <MinusIcon />
        </MinusButton>
      )}
      <Input
        type="text"
        aria-label={ariaLabel}
        value={getDisplayValue()}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        readOnly={readOnly}
      />
      {onIncrement && (
        <PlusButton type="button" aria-label="수량 늘리기" disabled={disabled} onMouseDown={preventTextSelection} onClick={onIncrement}>
          <PlusIcon />
        </PlusButton>
      )}
    </InputContainer>
  );
}

export default NumberInput;
