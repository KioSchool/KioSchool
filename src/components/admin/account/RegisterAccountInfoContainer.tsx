import NewCommonButton from '@components/common/button/NewCommonButton';
import styled from '@emotion/styled';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { RiInformationFill } from '@remixicon/react';
import { Color } from '@resources/colors';

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

const Tooltip = styled.div`
  position: absolute;
  width: 464px;
  padding: 4px 8px;
  box-sizing: border-box;
  background: ${Color.WHITE};
  border-radius: 4px;
  border: 1px solid #e8eef2;
  color: #5c5c5c;
  font-size: 12px;
  font-weight: 400;

  bottom: calc(100% + 8px);
  left: 0;
  z-index: 10;

  visibility: hidden;
  opacity: 0;
  transition: opacity 0.2s ease, visibility 0.2s ease;
  pointer-events: none;

  ${rowFlex({ justify: 'center', align: 'center' })}
`;

const InfoIconWrapper = styled.div`
  position: relative;
  color: #adb5bd;
  padding-left: 4px;
  ${rowFlex({ justify: 'start', align: 'center' })}

  &:hover > .info-tooltip {
    visibility: visible;
    opacity: 1;
  }
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
  infoTooltip?: string;
}

function RegisterAccountInfoContainer({ title, children, primaryButton, secondaryButton, infoTooltip }: RegisterAccountInfoContainerProps) {
  return (
    <Container>
      <TitleRow>
        <Title>{title}</Title>
        {infoTooltip && (
          <InfoIconWrapper>
            <RiInformationFill size={18} color="#464A4D" />
            <Tooltip className="info-tooltip">{infoTooltip}</Tooltip>
          </InfoIconWrapper>
        )}
      </TitleRow>

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
