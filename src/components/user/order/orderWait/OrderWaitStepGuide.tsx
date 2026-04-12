import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';

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
  return (
    <>
      <StepList>
        {isTossPay ? (
          <>
            <StepItem>
              <StepText>토스 앱에서 송금을 완료해주세요</StepText>
            </StepItem>
            <StepItem>
              <StepText>앱이 열리지 않으면 아래 버튼으로 재시도해주세요</StepText>
            </StepItem>
            <StepItem>
              <StepText>확인되면 자동으로 주문 내역 페이지로 이동합니다</StepText>
            </StepItem>
          </>
        ) : (
          <>
            <StepItem>
              <StepText>위 계좌번호를 복사하고 은행 앱에서 송금해주세요</StepText>
            </StepItem>
            <StepItem>
              <StepText>송금 후 이 화면에서 잠시만 기다려주세요</StepText>
            </StepItem>
            <StepItem>
              <StepText>확인되면 자동으로 주문 내역 페이지로 이동합니다</StepText>
            </StepItem>
          </>
        )}
      </StepList>
      {isTossPay && <RetryButton onClick={onTossRetry}>토스 앱 다시 열기</RetryButton>}
    </>
  );
}

export default OrderWaitStepGuide;
