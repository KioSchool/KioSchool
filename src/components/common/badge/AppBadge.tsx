import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ReactNode } from 'react';
import { Color } from '@resources/colors';
import { rowFlex } from '@styles/flexStyles';

export interface CustomBadgeSize {
  height?: number;
  font?: number;
  borderRadius?: number;
  paddingX?: number;
}

export interface CustomBadgeTheme {
  background?: string;
  color?: string;
  border?: string;
}

interface AppBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  background?: string;
  noBorder?: boolean;
  customSize?: CustomBadgeSize;
  customColors?: CustomBadgeTheme;
  icon?: ReactNode;
  gap?: number;
}

const sizeStyles = (customSize: CustomBadgeSize | undefined) => {
  if (!customSize) {
    return css`
      padding: 0 10px;
      height: 30px;
      border-radius: 1000px;
      line-height: 30px;
      font-size: 15px;
    `;
  }

  return css`
    padding: 0 ${customSize.paddingX ?? 10}px;
    height: ${customSize.height ?? 30}px;
    border-radius: ${customSize.borderRadius ?? 1000}px;
    line-height: ${customSize.height ?? 30}px;
    font-size: ${customSize.font ?? 15}px;
  `;
};

const colorStyles = (props: AppBadgeProps) => {
  if (props.customColors) {
    return css`
      background: ${props.customColors.background ?? props.background ?? Color.WHITE};
      color: ${props.customColors.color ?? Color.BLACK};
      border: ${props.customColors.border ?? (props.noBorder ? 'none' : '1px solid black')};
    `;
  }

  return css`
    background: ${props.background || Color.WHITE};
    color: ${Color.BLACK};
    border: ${props.noBorder ? 'none' : '1px solid black'};
  `;
};

const Container = styled.div<AppBadgeProps>`
  width: auto;
  box-sizing: border-box;
  text-align: center;
  user-select: none;
  white-space: nowrap;
  gap: ${({ gap }) => gap ?? 4}px;
  ${rowFlex({ justify: 'center', align: 'center' })}

  ${({ customSize }) => sizeStyles(customSize)}
  ${(props) => colorStyles(props)}

  :active {
    background-color: gray;
  }

  :not(:active) {
    transition: background-color 600ms ease;
  }
`;
function AppBadge(props: AppBadgeProps) {
  const { icon, children, ...rest } = props;

  return (
    <Container {...rest} className={'app-badge'}>
      {icon}
      {children}
    </Container>
  );
}

export default AppBadge;
