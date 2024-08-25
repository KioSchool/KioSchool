import React from 'react';
import styled from '@emotion/styled';

export interface AppLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  size?: 'small' | 'medium' | 'large' | number;
}

const sizeMap = {
  small: '18px',
  medium: '32px',
  large: '40px',
};

const Container = styled.label`
  color: #5c5c5c;
  font-size: ${(props: AppLabelProps) => {
    if (typeof props.size === 'number') return `${props.size}px`;
    return sizeMap[props.size || 'medium'];
  }};
  font-weight: 500;
  user-select: none;
`;

function AppLabel(props: AppLabelProps) {
  return <Container {...props} />;
}

export default AppLabel;
