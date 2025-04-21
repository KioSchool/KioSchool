import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Color } from '@resources/colors';
import { rowFlex } from '@styles/flexStyles';

export type ButtonSize = 'xs' | 'sm' | 'md';

interface NewRoundedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  width?: number;
  height?: number;
}

const sizeStyles = (size: ButtonSize, width?: number, height?: number) => {
  if (width || height) {
    return css`
      ${width != null && `width: ${width}px;`}
      ${height != null && `height: ${height}px;`}
    `;
  }

  switch (size) {
    case 'xs':
      return css`
        font-size: 13px;
        width: 135px;
        height: 30px;
      `;
    case 'sm':
      return css`
        font-size: 16px;
        width: 45px;
        height: 7px;
      `;
    case 'md':
      return css`
        font-size: 20px;
        width: 150px;
        height: 35px;
      `;
  }
};

const StyledButton = styled.button<NewRoundedButtonProps>`
  box-sizing: content-box;
  ${rowFlex({ justify: 'center', align: 'center' })}
  background: ${Color.KIO_ORANGE};
  color: ${Color.WHITE};
  border: none;
  border-radius: 40px;
  cursor: pointer;
  padding: 5px 25px;
  font-family: 'LINE Seed Sans KR', sans-serif;
  font-weight: 700;

  ${({ size = 'md', width, height }) => sizeStyles(size, width, height)}

  &:hover:not(:disabled) {
    background: #ff9d50;
  }

  &:disabled {
    background: #b1b1b1;
    cursor: not-allowed;
  }
`;

function NewRoundedButton(props: NewRoundedButtonProps) {
  return <StyledButton {...props} />;
}

export default NewRoundedButton;
