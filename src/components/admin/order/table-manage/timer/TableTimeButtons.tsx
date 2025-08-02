import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';

const Container = styled.div`
  width: 100%;
  gap: 5px;
  ${colFlex()};
`;

const TopRow = styled.div`
  gap: 5px;
  ${rowFlex({ justify: 'space-between', align: 'center' })};
`;

const BottomRow = styled.div`
  width: 100%;
`;

const Button = styled.button<{ isFullWidth?: boolean }>`
  background: ${Color.KIO_ORANGE};
  color: ${Color.WHITE};
  border: none;
  border-radius: 40px;
  cursor: pointer;
  font-family: 'LINE Seed Sans KR', sans-serif;
  font-size: 12px;
  font-weight: 700;
  padding: 8px;
  width: ${({ isFullWidth }) => (isFullWidth ? '100%' : '81px')};
  height: 30px;
  ${rowFlex({ justify: 'center', align: 'center' })}

  &:hover {
    background: ${({ disabled }) => (disabled ? Color.LIGHT_GREY : '#ff9d50')};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
    background: ${Color.LIGHT_GREY};
    color: ${Color.GREY};
  }
`;

interface TableTimeButtonsProps {
  handleDecreaseTime: () => void;
  handleIncreaseTime: () => void;
  handleEndSession: () => void;
  handleStartSession: () => void;
  orderSessionId?: number;
  disabled?: boolean;
}

function TableTimeButtons({ handleDecreaseTime, handleIncreaseTime, handleEndSession, handleStartSession, orderSessionId, disabled }: TableTimeButtonsProps) {
  return (
    <Container>
      <TopRow>
        <Button disabled={disabled} onClick={handleDecreaseTime}>
          감소
        </Button>
        <Button disabled={disabled} onClick={handleIncreaseTime}>
          증가
        </Button>
      </TopRow>
      <BottomRow>
        {orderSessionId ? (
          <Button isFullWidth disabled={disabled} onClick={handleEndSession}>
            사용종료
          </Button>
        ) : (
          <Button isFullWidth onClick={handleStartSession}>
            사용시작
          </Button>
        )}
      </BottomRow>
    </Container>
  );
}

export default TableTimeButtons;
