import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Color } from '@resources/colors';
import { rowFlex } from '@styles/flexStyles';

type ButtonSize = 'xs' | 'sm' | 'md';

export interface CustomButtonSize {
  width?: number;
  height?: number;
}

const sizeStyles = (size: ButtonSize, customSize: CustomButtonSize | undefined) => {
  if (customSize) {
    return css`
      width: ${customSize.width ?? 150}px;
      height: ${customSize.height ?? 35}px;
      font-size: ${customSize.height ? `${customSize.height * 0.5}px` : '20px'};
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
        width: 172px;
        height: 37px;
      `;
    case 'md':
      return css`
        font-size: 20px;
        width: 210px;
        height: 45px;
      `;
  }
};

interface NewRoundedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  customSize?: CustomButtonSize;
}

const StyledButton = styled.button<NewRoundedButtonProps>`
  ${rowFlex({ justify: 'center', align: 'center' })}
  background: ${Color.KIO_ORANGE};
  color: ${Color.WHITE};
  border: none;
  border-radius: 40px;
  cursor: pointer;
  padding: 5px 25px;
  font-weight: 700;

  ${({ size = 'md', customSize }) => sizeStyles(size, customSize)}

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
