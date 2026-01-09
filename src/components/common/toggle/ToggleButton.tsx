import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { rowFlex } from '@styles/flexStyles';

const Container = styled.div`
  box-sizing: border-box;
  height: 28px;
  width: 100%;
  max-width: 250px;
  position: relative;
  cursor: pointer;
`;

const ToggleBackground = styled.div`
  position: absolute;
  inset: 0;
  background-color: ${Color.WHITE};
  border: 1px solid #e8eef2;
  border-radius: 40px;
`;

const ToggleSlider = styled.div<{ checked: boolean }>`
  position: absolute;
  inset: 0;
  background-color: ${({ checked }) => (checked ? Color.KIO_ORANGE : '#e8eef2')};
  border-radius: 40px;
  padding: 12px 50px 14px;
  ${({ checked }) => (checked ? 'left: 42.65%; right: 0;' : 'left: 0; right: 42.65%;')}
  transition: all 0.3s ease;
  ${rowFlex({ justify: 'center', align: 'center' })};
`;

const ToggleText = styled.p<{ checked: boolean }>`
  font-weight: 700;
  font-size: 12px;
  color: ${({ checked }) => (checked ? Color.WHITE : '#d1d5d8')};
`;

interface ToggleButtonProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  onText?: string;
  offText?: string;
  className?: string;
}

function ToggleButton({ checked, onChange, onText = 'ON', offText = 'OFF', className }: ToggleButtonProps) {
  return (
    <Container className={className} onClick={() => onChange(!checked)}>
      <ToggleBackground />
      <ToggleSlider checked={checked}>
        <ToggleText checked={checked}>{checked ? onText : offText}</ToggleText>
      </ToggleSlider>
    </Container>
  );
}

export default ToggleButton;
