import React, { ForwardedRef, forwardRef } from 'react';
import AppInput, { AppInputProps } from './AppInput';
import styled from '@emotion/styled';

interface AppInputWithLabelProps extends AppInputProps {
  label: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin: 5px 0;
`;

const TitleLabel = styled.label`
  font-size: 14px;
  font-weight: 500;
  margin: 8px 0;
`;

const AppInputWithLabel = forwardRef<HTMLInputElement, AppInputWithLabelProps>((props: AppInputWithLabelProps, ref: ForwardedRef<HTMLInputElement>) => {
  return (
    <Container>
      <TitleLabel htmlFor={props.id}>{props.label}</TitleLabel>
      <AppInput {...props} ref={ref} />
    </Container>
  );
});

export default AppInputWithLabel;
