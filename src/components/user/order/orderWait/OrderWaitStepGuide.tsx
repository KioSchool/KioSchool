import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { TOSS_STEPS, BANK_TRANSFER_STEPS } from '@constants/data/orderWaitData';

const StepList = styled.ol`
  width: 100%;
  list-style: none;
  counter-reset: step;
  margin: 0;
  padding: 0 10px;
  box-sizing: border-box;
  gap: 14px;
  ${colFlex({ justify: 'center', align: 'start' })}
`;

const StepItem = styled.li`
  width: 100%;
  counter-increment: step;
  gap: 12px;
  ${rowFlex({ align: 'center' })}

  &::before {
    content: counter(step);
    min-width: 22px;
    height: 22px;
    font-size: 12px;
    font-weight: 600;
    color: ${Color.KIO_ORANGE};
    border: 1.5px solid ${Color.KIO_ORANGE};
    border-radius: 50%;
    ${rowFlex({ justify: 'center', align: 'center' })}
  }
`;

const StepText = styled.span`
  font-size: 13px;
  font-weight: 500;
  color: ${Color.GREY};
  line-height: 1.4;
  word-break: keep-all;
`;

const RetryButton = styled.button`
  align-self: center;
  background: none;
  border: none;
  padding: 4px 0;
  font-size: 13px;
  font-weight: 500;
  color: ${Color.GREY};
  text-decoration: underline;
  text-underline-offset: 3px;
  cursor: pointer;
`;

interface OrderWaitStepGuideProps {
  isTossPay: boolean;
  onTossRetry: () => void;
}

function OrderWaitStepGuide({ isTossPay, onTossRetry }: OrderWaitStepGuideProps) {
  const steps = isTossPay ? TOSS_STEPS : BANK_TRANSFER_STEPS;

  return (
    <>
      <StepList>
        {steps.map((step) => (
          <StepItem key={step}>
            <StepText>{step}</StepText>
          </StepItem>
        ))}
      </StepList>
      {isTossPay && <RetryButton onClick={onTossRetry}>토스 앱 다시 열기</RetryButton>}
    </>
  );
}

export default OrderWaitStepGuide;
