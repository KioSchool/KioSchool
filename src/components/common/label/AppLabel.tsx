import styled from '@emotion/styled';
import { ColorType, Color } from '@resources/colors';

export interface AppLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  size?: 'small' | 'medium' | 'large' | number;
  color?: ColorType;
}

const sizeMap = {
  small: '18px',
  medium: '32px',
  large: '40px',
};

const Container = styled.label<{ size?: 'small' | 'medium' | 'large' | number; color?: ColorType }>`
  color: ${(props) => props.color || Color.GREY};
  font-size: ${(props: AppLabelProps) => {
    if (typeof props.size === 'number') return `${props.size}px`;
    return sizeMap[props.size || 'medium'];
  }};
  font-weight: 500;
  user-select: none;
`;

function AppLabel(props: AppLabelProps) {
  return <Container {...props} className={'app-label'} />;
}

export default AppLabel;
