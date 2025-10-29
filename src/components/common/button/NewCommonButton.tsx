﻿import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Color } from '@resources/colors';
import { rowFlex } from '@styles/flexStyles';

type ButtonSize = 'xs' | 'sm' | 'md';
type ButtonColor = 'kio_orange' | 'blue_gray';

export interface CustomButtonSize {
  width?: number;
  height?: number;
}

export interface CustomColorTheme {
  background?: string;
  color?: string;
  border?: string;
  hoverBackground?: string;
  hoverColor?: string;
  hoverBorder?: string;
}

const sizeStyles = (size: ButtonSize, customSize: CustomButtonSize | undefined) => {
  if (customSize) {
    return css`
      width: ${customSize.width ?? 150}px;
      height: ${customSize.height ?? 35}px;
      font-size: ${customSize.height ? `${customSize.height * 0.5}px` : '18px'};
    `;
  }

  switch (size) {
    case 'xs':
      return css`
        font-size: 13px;
        width: 136px;
        height: 32px;
      `;
    case 'sm':
      return css`
        font-size: 16px;
        width: 172px;
        height: 40px;
      `;
    case 'md':
      return css`
        font-size: 20px;
        width: 210px;
        height: 52px;
      `;
  }
};

const colorStyles = (color: ButtonColor) => {
  switch (color) {
    case 'kio_orange':
      return css`
        background: ${Color.KIO_ORANGE};
        color: ${Color.WHITE};
        border: none;

        &:hover:not(:disabled) {
          background: #ffaf70;
        }
      `;

    case 'blue_gray':
      return css`
        background: ${Color.WHITE};
        color: #464a4d;
        border: 1px solid #e8eef2;

        &:hover:not(:disabled) {
          //todo: hover 색상 디자이너에게 물어보기
          background: #fcfcfc;
        }
      `;
  }
};

const customColorStyles = (theme: CustomColorTheme | undefined) => {
  if (!theme) {
    return css``;
  }

  return css`
    ${theme.background && `background: ${theme.background};`}
    ${theme.color && `color: ${theme.color};`}
    ${theme.border && `border: ${theme.border};`}

    &:hover:not(:disabled) {
      ${theme.hoverBackground && `background: ${theme.hoverBackground};`}
      ${theme.hoverColor && `color: ${theme.hoverColor};`}
      ${theme.hoverBorder && `border: ${theme.hoverBorder};`}
    }
  `;
};

interface NewCommonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  customSize?: CustomButtonSize;
  color?: ButtonColor;
  customColors?: CustomColorTheme;
}

const StyledButton = styled.button<NewCommonButtonProps>`
  border-radius: 40px;
  cursor: pointer;
  padding: 0 14px;
  font-family: 'LINE Seed Sans KR', sans-serif;
  font-weight: 700;
  ${rowFlex({ justify: 'center', align: 'center' })}

  ${({ size = 'md', customSize }) => sizeStyles(size, customSize)}
  ${({ color = 'kio_orange' }) => colorStyles(color)}
  ${({ customColors }) => customColorStyles(customColors)}

  &:disabled {
    //todo: disabled 색상 선정 여부 논의 필요
    background: #b1b1b1;
    color: ${Color.WHITE};
    border: none;
    cursor: not-allowed;
  }
`;

function NewCommonButton(props: NewCommonButtonProps) {
  return <StyledButton {...props} />;
}

export default NewCommonButton;
