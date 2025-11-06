import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { RiCheckboxCircleFill, RiCloseCircleFill } from '@remixicon/react';

type StatusType = 'registered' | 'unregistered' | 'unregisteredAccount';

const getStatusColor = (status: StatusType) => {
  switch (status) {
    case 'registered':
      return Color.GREEN;
    case 'unregistered':
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

const Title = styled.div<{ status: StatusType }>`
  font-size: 20px;
  font-weight: 700;
  line-height: 24px;

  color: ${({ status }) => getStatusColor(status)};
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
  const content = {
    registered: {
      title: '등록됨',
      description: '현재 토스 QR이 정상적으로 등록되어 있습니다.',
    },
    unregistered: {
      title: '등록되지 않음',
      description: '현재 토스 QR이 등록되어 있지 않습니다.',
    },
    unregisteredAccount: {
      title: '등록되지 않음',
      description: '현재 계좌가 등록되어 있지 않습니다.',
    },
  };

  const { title, description } = content[status];

  const IconComponent = status === 'registered' ? RiCheckboxCircleFill : RiCloseCircleFill;
  const iconColor = getStatusColor(status);

  return (
    <StyledContainer>
      <InfoWrapper>
        <TitleWrapper>
          <IconComponent color={iconColor} size={24} />
          <Title status={status}>{title}</Title>
        </TitleWrapper>
        <Description>{description}</Description>
      </InfoWrapper>
    </StyledContainer>
  );
}

export default RegistrationStatusInfo;
