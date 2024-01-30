import React, { ForwardedRef, forwardRef } from 'react';
import AppInput, { AppInputProps } from '@components/common/input/AppInput';
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

const LabelContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
`;

const TitleLabel = styled.label`
  display: inline-block;
  font-size: 14px;
  font-weight: 500;
`;

const MessageLabel = styled.label`
  display: inline-block;
  padding: 0 10px 0;
  font-size: 12px;
  font-weight: 500;
`;

const AppInputWithLabel = forwardRef<HTMLInputElement, AppInputWithLabelProps>((props: AppInputWithLabelProps, ref: ForwardedRef<HTMLInputElement>) => {
  return (
    <Container>
      <LabelContainer>
        <TitleLabel htmlFor={props.id}>{props.titleLabel}</TitleLabel>
        <MessageLabel htmlFor={props.id}>{props.messageLabel}</MessageLabel>
      </LabelContainer>
      <AppInput {...props} ref={ref} />
    </Container>
  );
});

export default AppInputWithLabel;
