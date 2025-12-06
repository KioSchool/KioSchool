import { ForwardedRef, forwardRef } from 'react';
import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import NewAppInputLayout, { BaseInputLayoutProps } from './NewAppInputLayout';

const StyledInput = styled.input<{ height?: number }>`
  border: none;
  border-radius: 45px;
  box-sizing: border-box;
  width: 100%;
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

export interface NewAppInputProps extends Omit<BaseInputLayoutProps, 'children'>, Omit<React.InputHTMLAttributes<HTMLInputElement>, 'width' | 'height'> {
  height?: number;
}

const NewAppInput = forwardRef<HTMLInputElement, NewAppInputProps>((props: NewAppInputProps, ref: ForwardedRef<HTMLInputElement>) => {
  const { width, label, buttonProps, linkProps, enterHandler, height, ...inputProps } = props;

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      enterHandler?.();
    }
  };

  return (
    <NewAppInputLayout width={width} label={label} buttonProps={buttonProps} linkProps={linkProps} enterHandler={enterHandler}>
      <StyledInput id={'input-id'} {...inputProps} height={height} ref={ref} onKeyDown={onKeyDown} />
    </NewAppInputLayout>
  );
});

export default NewAppInput;
