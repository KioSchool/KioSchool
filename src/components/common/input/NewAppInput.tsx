import React, { ForwardedRef, forwardRef } from 'react';
import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';

const Container = styled.div<NewAppInputProps>`
  width: ${({ width }) => (width ? `${width}px` : '500px')};
  ${colFlex({ justify: 'center', align: 'center' })};
`;

const HeaderContainer = styled.div`
  width: 100%;
  ${rowFlex({ align: 'center' })};
`;

const InputLabel = styled.span`
  color: ${Color.GREY};
  font-size: 20px;
  font-weight: 500;
  padding-left: 10px;
`;

const StyledInput = styled.input<NewAppInputProps>`
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

interface NewAppInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  enterHandler?: () => void;
  width?: number;
  height?: number;
  label?: string;
}

const NewAppInput = forwardRef<HTMLInputElement, NewAppInputProps>((props: NewAppInputProps, ref: ForwardedRef<HTMLInputElement>) => {
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      props.enterHandler?.();
    }
  };

  return (
    <Container {...props}>
      <HeaderContainer>{props.label && <InputLabel>{props.label}</InputLabel>}</HeaderContainer>
      <StyledInput {...props} ref={ref} onKeyDown={onKeyDown} className={'app-input'} />
    </Container>
  );
});

export default NewAppInput;
