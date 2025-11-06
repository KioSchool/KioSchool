import NewCommonButton from '@components/common/button/NewCommonButton';
import styled from '@emotion/styled';
import { colFlex, rowFlex } from '@styles/flexStyles';

const Container = styled.div`
  // TODO : 디자인이 생각보다 너무 넓어서 자체적으로 줄임
  width: 50%;
  height: 100%;
  padding: 18px 30px;
  box-sizing: border-box;
  border: 1px solid #e8eef2;
  border-radius: 16px;
  box-shadow: 0 4px 20px 0 rgba(92, 92, 92, 0.05);
  ${colFlex({ justify: 'start', align: 'center' })}
`;

const Title = styled.span`
  width: 100%;
  font-size: 16px;
  font-weight: bold;
  color: #464a4d;
`;

const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  ${colFlex({ justify: 'center', align: 'center' })}
`;

const ButtonWrapper = styled.div`
  width: 360px;
  gap: 16px;
  padding-bottom: 20px;
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
