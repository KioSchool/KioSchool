import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { rowFlex } from '@styles/flexStyles';

const Container = styled.div`
  gap: 12px;
  ${rowFlex({ justify: 'space-between', align: 'center' })}
`;

const UndoButton = styled.button`
  flex-shrink: 0;
  padding: 0;
  border: none;
  background: transparent;
  font-size: 14px;
  font-weight: 800;
  text-decoration: underline;
  color: ${Color.KIO_ORANGE_DARK};
  cursor: pointer;
`;

interface PayUndoToastProps {
  message: string;
  onUndo: () => void;
}

function PayUndoToast({ message, onUndo }: PayUndoToastProps) {
  return (
    <Container>
      <span>{message}</span>
      <UndoButton onClick={onUndo}>되돌리기</UndoButton>
    </Container>
  );
}

export default PayUndoToast;
