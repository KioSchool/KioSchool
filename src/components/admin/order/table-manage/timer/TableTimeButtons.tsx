import styled from '@emotion/styled';
import { rowFlex } from '@styles/flexStyles';

const Container = styled.div`
  width: 100%;
  gap: 5px;
  ${rowFlex({ justify: 'space-between', align: 'center' })};
`;

const Button = styled.button`
  background: #e8eef2;
  color: #464a4d;
  border: none;
  border-radius: 40px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 700;
  width: 77px;
  height: 32px;
  ${rowFlex({ justify: 'center', align: 'center' })}

  &:hover {
    background: ${({ disabled }) => (disabled ? '#e8eef2' : '#d9e3e8')};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
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
        차감
      </Button>
      <Button disabled={disabled} onClick={handleIncreaseTime}>
        추가
      </Button>
    </Container>
  );
}

export default TableTimeButtons;
