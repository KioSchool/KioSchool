import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Color } from '@resources/colors';
import { rowFlex } from '@styles/flexStyles';
import { ReactNode } from 'react';

type ButtonSize = 'xs' | 'sm' | 'md';
type ButtonColor = 'kio_orange' | 'blue_gray';

export interface CustomButtonSize {
  width?: number;
  height?: number;
  font?: number;
  borderRadius?: number;
  padding?: number;
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
      font-size: ${customSize.font ?? 13}px;
      border-radius: ${customSize.borderRadius ?? 40}px;
      padding: ${customSize.padding ?? 14}px;
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

const StyledButton = styled.button<NewCommonButtonProps>`
  border-radius: 40px;
  cursor: pointer;
  padding: 0 14px;
  font-weight: 700;
  gap: ${({ gap }) => gap ?? 4}px;
  ${rowFlex({ justify: 'center', align: 'center' })}

  ${({ size = 'md', customSize }) => sizeStyles(size, customSize)}
  ${({ color = 'kio_orange' }) => colorStyles(color)}
  ${({ customColors }) => customColorStyles(customColors)}

  &:disabled {
    background: #e8eef2;
    color: #d1d5d8;
    border: none;
    cursor: not-allowed;
  }
`;

interface NewCommonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  customSize?: CustomButtonSize;
  color?: ButtonColor;
  customColors?: CustomColorTheme;
  icon?: ReactNode;
  gap?: number;
}

function NewCommonButton({ icon, gap, children, ...props }: NewCommonButtonProps) {
  return (
    <StyledButton gap={gap} {...props}>
      {children}
      {icon && icon}
    </StyledButton>
  );
}

export default NewCommonButton;
