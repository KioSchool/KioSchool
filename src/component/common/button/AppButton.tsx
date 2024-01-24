import React from 'react';
import styled from '@emotion/styled';

export interface AppButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'small' | 'medium' | 'large';
}

const sizeMap = {
  small: '120px',
  medium: '155px',
  large: '500px',
};

const Container = styled.button`
  width: ${(props: AppButtonProps) => sizeMap[props.size || 'medium']};
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
