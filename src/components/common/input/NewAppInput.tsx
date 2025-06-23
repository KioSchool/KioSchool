import { ForwardedRef, forwardRef } from 'react';
import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import NewRoundedButton, { CustomButtonSize } from '../button/NewRoundedButton';
import { RiShareBoxLine } from '@remixicon/react';

const Container = styled.div<NewAppInputProps>`
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
  ${rowFlex({ justify: 'center', align: 'center' })};
  cursor: pointer;
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

export interface InputButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: CustomButtonSize;
  text: string;
}

export interface NewAppInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  enterHandler?: () => void;
  width?: number | string;
  height?: number;
  label?: string;
  buttonProps?: InputButtonProps;
  linkProps?: {
    text: string;
    url: string;
  };
}

const NewAppInput = forwardRef<HTMLInputElement, NewAppInputProps>((props: NewAppInputProps, ref: ForwardedRef<HTMLInputElement>) => {
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      props.enterHandler?.();
    }
  };

  return (
    <Container {...props}>
      <HeaderContainer>
        {props.label && <InputLabel>{props.label}</InputLabel>}
        {props.linkProps && (
          <LinkContainer href={props.linkProps.url} target="_blank" rel="noopener noreferrer">
            <LinkIcon size={16} />
            <LinkText>{props.linkProps.text}</LinkText>
          </LinkContainer>
        )}
        {props.buttonProps && (
          <NewRoundedButton
            {...props.buttonProps}
            size={'xs'}
            customSize={props.buttonProps.size}
            onClick={props.enterHandler}
            style={{ marginLeft: 'auto', marginRight: '10px' }}
          >
            {props.buttonProps.text}
          </NewRoundedButton>
        )}
      </HeaderContainer>
      <StyledInput id={'input-id'} {...props} ref={ref} onKeyDown={onKeyDown} />
    </Container>
  );
});

export default NewAppInput;
