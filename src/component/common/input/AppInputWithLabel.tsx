import React, { ForwardedRef, forwardRef } from 'react';
import AppInput, { AppInputProps } from './AppInput';
import styled from '@emotion/styled';

interface AppInputWithLabelProps extends AppInputProps {
  titleLabel: string;
  messageLabel?: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const TitleLabel = styled.label`
  font-family: Inter;
  font-size: 14px;
  font-weight: 500;
`;

const MessageLabel = styled.label`
  font-family: Inter;
  font-size: 12px;
  font-weight: 500;
`;

const AppInputWithLabel = forwardRef<HTMLInputElement, AppInputWithLabelProps>((props: AppInputWithLabelProps, ref: ForwardedRef<HTMLInputElement>) => {
  return (
    <Container>
      <TitleLabel htmlFor={props.id}>{props.titleLabel}</TitleLabel>
      <MessageLabel htmlFor={props.id}>{props.messageLabel}</MessageLabel>
      <AppInput {...props} ref={ref} />
    </Container>
  );
});

export default AppInputWithLabel;
