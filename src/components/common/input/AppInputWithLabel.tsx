import React, { ForwardedRef, forwardRef } from 'react';
import AppInput, { AppInputProps } from '@components/common/input/AppInput';
import styled from '@emotion/styled';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { Color } from '@resources/colors';

interface AppInputWithLabelProps extends AppInputProps {
  titleLabel: string;
  messageLabel?: string;
  onMessageLabelClick?: () => void;
}

const Container = styled.div`
  gap: 12px;
  ${colFlex()}
`;

const LabelContainer = styled.div`
  ${rowFlex({ align: 'center' })}
`;

const TitleLabel = styled.label`
  display: inline-block;
  font-size: 14px;
  font-weight: 500;
`;

const MessageLabel = styled.label<{ clickable?: boolean }>`
  display: inline-block;
  padding: 0 10px 0;
  font-size: 12px;
  font-weight: 500;
  text-decoration: ${(props) => (props.clickable ? 'underline' : 'none')};
  cursor: ${(props) => (props.clickable ? 'pointer' : 'default')};
  &:hover {
    color: ${(props) => (props.clickable ? Color.KIO_ORANGE : Color.BLACK)};
  }
`;

const AppInputWithLabel = forwardRef<HTMLInputElement, AppInputWithLabelProps>((props: AppInputWithLabelProps, ref: ForwardedRef<HTMLInputElement>) => {
  return (
    <Container className={'app-input-with-label'}>
      <LabelContainer className={'label-container'}>
        <TitleLabel htmlFor={props.id} className={'title-label'}>
          {props.titleLabel}
        </TitleLabel>
        <MessageLabel htmlFor={props.id} className={'message-label'} onClick={props.onMessageLabelClick} clickable={!!props.onMessageLabelClick}>
          {props.messageLabel}
        </MessageLabel>
      </LabelContainer>
      <AppInput {...props} ref={ref} />
    </Container>
  );
});

export default AppInputWithLabel;
