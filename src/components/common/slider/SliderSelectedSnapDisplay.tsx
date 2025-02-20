import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { rowFlex } from '@styles/flexStyles';

const Container = styled.div`
  width: 30px;
  height: 20px;
  border-radius: 20px;
  background: rgba(3, 3, 3, 0.5);
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

const LabelContainer = styled.div`
  font-size: 10px;
  color: ${Color.WHITE};
`;

interface SelectedSnapDisplayProps {
  selectedSnap: number;
  snapCount: number;
}

function SelectedSnapDisplay({ selectedSnap, snapCount }: SelectedSnapDisplayProps) {
  if (snapCount === 0) return null;

  return (
    <Container>
      <LabelContainer>
        {selectedSnap + 1} / {snapCount}
      </LabelContainer>
    </Container>
  );
}

export default SelectedSnapDisplay;
