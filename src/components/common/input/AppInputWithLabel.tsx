import React, { ForwardedRef, forwardRef } from 'react';
import AppInput, { AppInputProps } from '@components/common/input/AppInput';
import styled from '@emotion/styled';
import { colFlex, rowFlex } from '@styles/flexStyles';

interface AppInputWithLabelProps extends AppInputProps {
  titleLabel: string;
  messageLabel?: string;
}

const Container = styled.div`
  gap: 12px;
  ${colFlex({})}
`;

const LabelContainer = styled.div`
  ${rowFlex({ align: 'center' })}
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
    <Container className={'app-input-with-label'}>
      <LabelContainer className={'label-container'}>
        <TitleLabel htmlFor={props.id} className={'title-label'}>
          {props.titleLabel}
        </TitleLabel>
        <MessageLabel htmlFor={props.id} className={'message-label'}>
          {props.messageLabel}
        </MessageLabel>
      </LabelContainer>
      <AppInput {...props} ref={ref} />
    </Container>
  );
});

export default AppInputWithLabel;
