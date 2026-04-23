import NewCommonButton from '@components/common/button/NewCommonButton';
import styled from '@emotion/styled';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { RiInformationFill } from '@remixicon/react';
import AppTooltip from '@components/common/tooltip/AppToolTip';

const Container = styled.div`
  width: 50%;
  height: 100%;
  padding: 18px 30px;
  box-sizing: border-box;
  border: 1px solid #e8eef2;
  border-radius: 16px;
  box-shadow: 0 4px 20px 0 rgba(92, 92, 92, 0.05);
  ${colFlex({ justify: 'start', align: 'center' })}
`;

const TitleRow = styled.div`
  width: 100%;
  ${rowFlex({ justify: 'start', align: 'center' })}
`;

const Title = styled.span`
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

const InfoIcon = styled(RiInformationFill)`
  width: 18px;
  height: 18px;
  padding-left: 4px;
  color: #464a4d;
`;

interface ButtonProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
}

interface RegisterAccountInfoContainerProps {
  title: string;
  children: React.ReactNode;
  primaryButton: ButtonProps;
  secondaryButton: ButtonProps;
  infoTooltip?: string;
}

function RegisterAccountInfoContainer({ title, children, primaryButton, secondaryButton, infoTooltip }: RegisterAccountInfoContainerProps) {
  return (
    <Container>
      <TitleRow>
        <Title>{title}</Title>
        {infoTooltip && (
          <AppTooltip content={infoTooltip}>
            <InfoIcon />
          </AppTooltip>
        )}
      </TitleRow>

      <ContentWrapper>{children}</ContentWrapper>
      <ButtonWrapper>
        <NewCommonButton onClick={secondaryButton.onClick} disabled={secondaryButton.disabled} color="blue_gray" size="sm">
          {secondaryButton.text}
        </NewCommonButton>
        <NewCommonButton onClick={primaryButton.onClick} disabled={primaryButton.disabled} size="sm">
          {primaryButton.text}
        </NewCommonButton>
      </ButtonWrapper>
    </Container>
  );
}

export default RegisterAccountInfoContainer;
