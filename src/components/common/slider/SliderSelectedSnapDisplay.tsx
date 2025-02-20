import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { rowFlex } from '@styles/flexStyles';

const Container = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 35px;
  height: 20px;
  border-radius: 30px;
  background: rgba(3, 3, 3, 0.5);
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

const LabelContainer = styled.div`
  font-size: 10px;
  color: ${Color.WHITE};
  text-align: center;
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
