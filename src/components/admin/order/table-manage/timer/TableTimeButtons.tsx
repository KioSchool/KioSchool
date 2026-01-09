import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { rowFlex } from '@styles/flexStyles';

const Container = styled.div`
  width: 100%;
  gap: 5px;
  ${rowFlex({ justify: 'space-between', align: 'center' })};
`;

const Button = styled.button`
  background: ${Color.KIO_ORANGE};
  color: ${Color.WHITE};
  border: none;
  border-radius: 40px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 700;
  padding: 8px;
  width: 81px;
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
  disabled?: boolean;
}

function TableTimeButtons({ handleDecreaseTime, handleIncreaseTime, disabled }: TableTimeButtonsProps) {
  return (
    <Container>
      <Button disabled={disabled} onClick={handleDecreaseTime}>
        감소
      </Button>
      <Button disabled={disabled} onClick={handleIncreaseTime}>
        증가
      </Button>
    </Container>
  );
}

export default TableTimeButtons;
