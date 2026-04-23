import { ForwardedRef, forwardRef } from 'react';
import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import NewAppInputLayout, { BaseInputLayoutProps } from './NewAppInputLayout';

const StyledTextarea = styled.textarea<{ height?: number }>`
  border: none;
  border-radius: 28px;
  box-sizing: border-box;
  width: 100%;
  height: ${({ height }) => (height ? `${height}px` : '120px')};
  padding: 20px 30px;
  resize: none;
  line-height: 1.5;
  font-family: inherit;
  border: 1px solid rgba(201, 201, 201, 0.5);

  &:focus {
    outline: none;
    caret-color: ${Color.KIO_ORANGE};
  }

  &::placeholder {
    color: #c9c9c9;
  }

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #e0e0e0;
    border-radius: 10px;
    background-clip: padding-box;
    border: 2px solid transparent;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
    margin-block: 14px;
  }
`;

export interface NewAppTextareaProps
  extends Omit<BaseInputLayoutProps, 'children'>,
    Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'width' | 'height'> {
  height?: number;
}

function NewAppTextareaBase(props: NewAppTextareaProps, ref: ForwardedRef<HTMLTextAreaElement>) {
  const { width, label, buttonProps, linkProps, enterHandler, height, ...textareaProps } = props;

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && enterHandler) {
      e.preventDefault();
      enterHandler();
    }
  };

  return (
    <NewAppInputLayout width={width} label={label} buttonProps={buttonProps} linkProps={linkProps} enterHandler={enterHandler}>
      <StyledTextarea id={'textarea-id'} {...textareaProps} height={height} ref={ref} onKeyDown={onKeyDown} />
    </NewAppInputLayout>
  );
}

const NewAppTextarea = forwardRef(NewAppTextareaBase);

export default NewAppTextarea;
