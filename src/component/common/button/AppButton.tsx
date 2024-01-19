import React from 'react';
import styled from '@emotion/styled';

interface AppButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Container = styled.button`
  background: black;
  color: white;
  border-radius: 15px;
  width: 500px;
  height: 50px;
  padding: 0 18px;
`;

function AppButton(props: AppButtonProps) {
  return <Container {...props} />;
}

export default AppButton;
