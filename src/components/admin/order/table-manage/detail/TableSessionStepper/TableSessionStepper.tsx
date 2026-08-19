import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import NumberInput from '@components/common/input/NumberInput';
import { formatMinutesToTime } from '@utils/formatDate';

const Container = styled.div`
  width: 100%;
  gap: 8px;
  ${colFlex()};
`;

const ButtonRow = styled.div`
  width: 100%;
  gap: 8px;
  ${rowFlex({ align: 'center' })};
`;

const StepButton = styled.button<{ variant: 'decrease' | 'increase' }>`
  flex: 1;
  height: 36px;
  border: none;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  background-color: ${({ variant }) => (variant === 'decrease' ? Color.KIO_ORANGE_FAINT : Color.KIO_ORANGE)};
  color: ${({ variant }) => (variant === 'decrease' ? Color.KIO_ORANGE : Color.WHITE)};
  ${rowFlex({ justify: 'center', align: 'center' })};

  &:disabled {
    background-color: #e8eef2;
    color: #d1d5d8;
    cursor: not-allowed;
  }
`;

interface TableSessionStepperProps {
  minutes: number;
  onChangeMinutes: (value: number) => void;
  onIncrementMinutes: () => void;
  onDecrementMinutes: () => void;
  onDecreaseTime: () => void;
  onIncreaseTime: () => void;
  disabled: boolean;
}

function TableSessionStepper({
  minutes,
  onChangeMinutes,
  onIncrementMinutes,
  onDecrementMinutes,
  onDecreaseTime,
  onIncreaseTime,
  disabled,
}: TableSessionStepperProps) {
  return (
    <Container>
      <NumberInput
        value={minutes}
        formatter={formatMinutesToTime}
        onChange={onChangeMinutes}
        onIncrement={onIncrementMinutes}
        onDecrement={onDecrementMinutes}
        disabled={disabled}
      />
      <ButtonRow>
        <StepButton type="button" variant="decrease" disabled={disabled} onClick={onDecreaseTime}>
          감소
        </StepButton>
        <StepButton type="button" variant="increase" disabled={disabled} onClick={onIncreaseTime}>
          증가
        </StepButton>
      </ButtonRow>
    </Container>
  );
}

export default TableSessionStepper;
