import NewCommonButton from '@components/common/button/NewCommonButton';
import styled from '@emotion/styled';
import { colFlex, rowFlex } from '@styles/flexStyles';

const Container = styled.div`
  width: 594px;
  height: 100%;
  padding: 30px 18px;
  box-sizing: border-box;
  ${colFlex({ justify: 'center', align: 'center' })}
`;

const Title = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: #464a4d;
`;

const ContentWrapper = styled.div`
  width: 100%;
  ${colFlex({ justify: 'flex-start', align: 'stretch' })}
`;

const ButtonWrapper = styled.div`
  width: 360px;
  gap: 16px;
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

interface ButtonProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
}

interface RegisterAccountInfoContainerProps {
  title: string;
  children: React.ReactNode;
  primaryButton?: ButtonProps;
  secondaryButton?: ButtonProps;
}

function RegisterAccountInfoContainer({ title, children, primaryButton, secondaryButton }: RegisterAccountInfoContainerProps) {
  return (
    <Container>
      <Title>{title}</Title>
      <ContentWrapper>{children}</ContentWrapper>
      {(primaryButton || secondaryButton) && (
        <ButtonWrapper>
          {secondaryButton && (
            <NewCommonButton onClick={secondaryButton.onClick} disabled={secondaryButton.disabled} color="blue_gray" size="sm">
              {secondaryButton.text}
            </NewCommonButton>
          )}
          {primaryButton && (
            <NewCommonButton onClick={primaryButton.onClick} disabled={primaryButton.disabled} color="kio_orange" size="sm">
              {primaryButton.text}
            </NewCommonButton>
          )}
        </ButtonWrapper>
      )}
    </Container>
  );
}

export default RegisterAccountInfoContainer;
