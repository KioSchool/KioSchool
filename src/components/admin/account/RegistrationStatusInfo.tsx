import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { RiCheckboxCircleFill, RiCloseCircleFill } from '@remixicon/react';
import { REGISTRATION_STATUS_CONTENT, StatusType } from '@constants/data/accountData';

const getStatusColor = (status: StatusType) => {
  switch (status) {
    case 'registered':
      return Color.GREEN;
    case 'unregisteredTossQR':
    case 'unregisteredAccount':
      return Color.RED;
  }
};

const StyledContainer = styled.div`
  width: 100%;
  height: 214px;
  border-radius: 5px;
  ${colFlex({ justify: 'center', align: 'center' })}
`;

const InfoWrapper = styled.div`
  width: 300px;
  gap: 20px;
  ${colFlex({ justify: 'flex-start', align: 'center' })}
`;

const TitleWrapper = styled.div`
  gap: 10px;
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

const Title = styled.div<{ color: string }>`
  font-size: 20px;
  font-weight: 700;
  line-height: 24px;

  color: ${({ color }) => color};
`;

const Description = styled.div`
  color: #464a4d;
  font-size: 16px;
  font-weight: 400;
  text-align: center;
`;

interface RegistrationStatusInfoProps {
  status: StatusType;
}

function RegistrationStatusInfo({ status }: RegistrationStatusInfoProps) {
  const { title, description } = REGISTRATION_STATUS_CONTENT[status];

  const IconComponent = status === 'registered' ? RiCheckboxCircleFill : RiCloseCircleFill;
  const iconColor = getStatusColor(status);

  return (
    <StyledContainer>
      <InfoWrapper>
        <TitleWrapper>
          <IconComponent color={iconColor} size={24} />
          <Title color={iconColor}>{title}</Title>
        </TitleWrapper>
        <Description>{description}</Description>
      </InfoWrapper>
    </StyledContainer>
  );
}

export default RegistrationStatusInfo;
