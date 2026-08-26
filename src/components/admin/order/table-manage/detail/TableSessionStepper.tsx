import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import NumberInput from '@components/common/input/NumberInput';
import { formatMinutesToTime } from '@utils/formatDate';

const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 12px;
  gap: 8px;
  background-color: ${Color.LIGHT_GREY};
  border-radius: 12px;
  ${colFlex()};
`;

const SectionLabel = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: ${Color.MUTED_GREY};
`;

const ButtonRow = styled.div`
  width: 100%;
  gap: 8px;
  ${rowFlex({ align: 'center' })};
`;

const StepButton = styled.button<{ variant: 'decrease' | 'increase' }>`
  flex: 1;
  height: 38px;
  border: none;
  border-radius: 9px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  background-color: ${({ variant }) => (variant === 'decrease' ? Color.KIO_ORANGE_FAINT : Color.KIO_ORANGE)};
  color: ${({ variant }) => (variant === 'decrease' ? Color.KIO_ORANGE : Color.WHITE)};
  transition: opacity 0.15s ease-in-out;
  ${rowFlex({ justify: 'center', align: 'center' })};

  &:hover:not(:disabled) {
    opacity: 0.85;
  }

  &:disabled {
    background-color: ${Color.BORDER_GREY};
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
      <SectionLabel>이용 시간</SectionLabel>
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
