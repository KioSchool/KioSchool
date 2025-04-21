import React, { ForwardedRef, forwardRef } from 'react';
import styled from '@emotion/styled';
import { Color } from '@resources/colors';

const StyledInput = styled.input<NewAppInputProps>`
  border: none;
  border-radius: 45px;
  box-sizing: border-box;
  width: ${({ width }) => (width ? `${width}px` : '500px')};
  height: ${({ height }) => (height ? `${height}px` : '50px')};
  padding: 0 40px;

  border: 1px solid rgba(201, 201, 201, 0.5);

  &:focus {
    outline: none;
    caret-color: ${Color.KIO_ORANGE};
  }

  &::placeholder {
    color: #c9c9c9;
  }
`;

interface NewAppInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  enterHandler?: () => void;
  width?: number;
  height?: number;
}

const NewAppInput = forwardRef<HTMLInputElement, NewAppInputProps>((props: NewAppInputProps, ref: ForwardedRef<HTMLInputElement>) => {
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      props.enterHandler?.();
    }
  };

  return <StyledInput {...props} ref={ref} onKeyDown={onKeyDown} className={'app-input'} />;
});

export default NewAppInput;
