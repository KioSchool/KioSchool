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
  background: #eb6d09;
  color: white;
  font-size: 18px;
  border: none;
  border-radius: 15px;
  height: 50px;
  padding: 0 18px;
  user-select: none;
  box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.25);
  &:hover {
    background: #ff7b2b;
  }
`;

function AppButton(props: AppButtonProps) {
  return <Container {...props} />;
}

export default AppButton;
