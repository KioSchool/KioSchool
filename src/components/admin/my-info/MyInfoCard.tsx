import styled from '@emotion/styled';
import { colFlex } from '@styles/flexStyles';
import { mobileMediaQuery, tabletMediaQuery } from '@styles/globalStyles';

const CardContainer = styled.div`
  width: 295px;
  height: 300px;
  padding: 18px 0;
  box-sizing: border-box;
  gap: 10px;
  cursor: pointer;
  border-radius: 16px;
  border: 1px solid #e8eef2;
  background: rgba(255, 255, 255, 0.5);
  box-shadow: 0 4px 20px 0 rgba(92, 92, 92, 0.05);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  ${colFlex({ justify: 'center', align: 'center' })}

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 20px 0 rgba(92, 92, 92, 0.1);
  }

  ${tabletMediaQuery} {
    width: calc(50% - 5px);
    max-width: 295px;
    height: 240px;
  }

  ${mobileMediaQuery} {
    width: 100%;
    max-width: none;
    height: 160px;
  }
`;

const IconWrapper = styled.div`
  ${colFlex({ justify: 'center', align: 'center' })}
`;

const Label = styled.div`
  color: #464a4d;
  font-size: 20px;
  font-weight: 700;
`;

interface MyInfoCardProps {
  icon: React.ReactElement;
  label: string;
  onClick: () => void;
}

function MyInfoCard({ icon, label, onClick }: MyInfoCardProps) {
  return (
    <CardContainer onClick={onClick}>
      <IconWrapper>{icon}</IconWrapper>
      <Label>{label}</Label>
    </CardContainer>
  );
}

export default MyInfoCard;
