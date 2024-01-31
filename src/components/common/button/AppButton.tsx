import React from 'react';
import styled from '@emotion/styled';

export interface AppButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'small' | 'medium' | 'large' | number;
}

const sizeMap = {
  small: '120px',
  medium: '155px',
  large: '500px',
};

const Container = styled.button`
  width: ${(props: AppButtonProps) => {
    if (typeof props.size === 'number') return `${props.size}px`;
    return sizeMap[props.size || 'medium'];
  }};
  background: black;
  color: white;
  font-size: 18px;
  border: none;
  border-radius: 15px;
  height: 50px;
  padding: 0 18px;
`;

function AppButton(props: AppButtonProps) {
  return <Container {...props} />;
}

export default AppButton;
