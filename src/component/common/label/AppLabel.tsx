import React from 'react';
import styled from '@emotion/styled';

export interface AppLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  size?: 'small' | 'medium' | 'large';
}

const sizeMap = {
  small: '18px',
  medium: '32px',
  large: '40px',
};

const Container = styled.label`
  font-size: ${(props: AppLabelProps) => sizeMap[props.size || 'medium']};
  font-weight: 500;
`;

function AppLabel(props: AppLabelProps) {
  return <Container {...props} />;
}

export default AppLabel;
