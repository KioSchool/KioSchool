import styled from '@emotion/styled';
import { Color } from '@resources/colors';

export interface RoundedAppButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: string;
  fontSize?: string;
}

const Container = styled.button`
  width: ${(props: RoundedAppButtonProps) => props.size};
  background: ${Color.KIO_ORANGE};
  color: ${Color.WHITE};
  font-size: ${(props: RoundedAppButtonProps) => props.fontSize || '15px'};
  border: none;
  border-radius: 20px;
  height: 35px;
  padding: 0 35px;
  user-select: none;
  cursor: pointer;

  &:hover {
    background: #ff7b2b;
  }
  &:disabled {
    background: #b1b1b1;
  }
`;

function RoundedAppButton(props: RoundedAppButtonProps) {
  return <Container {...props} className={'rounded-app-button'} />;
}

export default RoundedAppButton;
