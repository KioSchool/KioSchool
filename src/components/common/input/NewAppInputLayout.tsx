import React, { ReactNode } from 'react';
import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { RiShareBoxLine } from '@remixicon/react';
import NewCommonButton, { ButtonColor, ButtonSize, CustomButtonSize } from '@components/common/button/NewCommonButton';

const Container = styled.div<ContainerProps>`
  width: ${({ width }) => {
    if (typeof width === 'number') {
      return `${width}px`;
    }
    return width || '500px';
  }};
  gap: 6px;
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

const LinkContainer = styled.a`
  gap: 3px;
  max-width: 250px;
  margin-left: 10px;
  text-decoration: none;
  cursor: pointer;
  ${rowFlex({ justify: 'center', align: 'center' })};

  &:hover > * {
    color: ${Color.KIO_ORANGE};
  }
`;

const LinkIcon = styled(RiShareBoxLine)`
  color: #939393;
`;

const LinkText = styled.span`
  color: #939393;
  font-size: 13px;
  font-weight: 500;
`;

export interface InputButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  color?: ButtonColor;
  customSize?: CustomButtonSize;
  text: string;
}

export interface BaseInputLayoutProps {
  width?: number | string;
  label?: string;
  buttonProps?: InputButtonProps;
  linkProps?: {
    text: string;
    url: string;
  };
  enterHandler?: () => void;
  children: ReactNode;
  className?: string;
}

interface ContainerProps {
  width?: number | string;
}

function NewAppInputLayout({ width, label, buttonProps, linkProps, enterHandler, children, className }: BaseInputLayoutProps) {
  return (
    <Container width={width} className={className}>
      <HeaderContainer>
        {label && <InputLabel>{label}</InputLabel>}
        {linkProps && (
          <LinkContainer href={linkProps.url} target="_blank" rel="noopener noreferrer">
            <LinkIcon size={16} />
            <LinkText>{linkProps.text}</LinkText>
          </LinkContainer>
        )}
        {buttonProps && (
          <NewCommonButton
            {...buttonProps}
            size={buttonProps.size || 'xs'}
            color={buttonProps.color}
            customSize={buttonProps.customSize}
            onClick={enterHandler}
            style={{ marginLeft: 'auto', marginRight: '10px' }}
          >
            {buttonProps.text}
          </NewCommonButton>
        )}
      </HeaderContainer>
      {children}
    </Container>
  );
}

export default NewAppInputLayout;
