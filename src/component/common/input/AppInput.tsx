import React, { ForwardedRef, forwardRef } from 'react';
import styled from '@emotion/styled';

export interface AppInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Container = styled.input`
  border: 1px solid black;
  border-radius: 15px;
  width: 500px;
  height: 50px;
  padding: 0 18px;
`;

const AppInput = forwardRef<HTMLInputElement, AppInputProps>((props: AppInputProps, ref: ForwardedRef<HTMLInputElement>) => {
  return <Container {...props} ref={ref} />;
});

export default AppInput;
