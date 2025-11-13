import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { colFlex } from '@styles/flexStyles';

const AccountInfoRow = styled.div`
  width: 100%;
  gap: 8px;
  ${colFlex({ justify: 'center', align: 'flex-start' })}
`;

const InfoLabel = styled.span`
  font-size: 16px;
  color: #464a4d;
  font-weight: 700;
`;

const ValueBox = styled.div`
  width: 100%;
  height: 50px;
  background-color: ${Color.WHITE};
  border-bottom: 1px solid #e8eef2;
  padding-left: 12px;
  box-sizing: border-box;
  ${colFlex({ justify: 'center', align: 'start' })}
`;

const ValueText = styled.span`
  font-size: 16px;
  color: #464a4d;
  font-weight: 400;
`;

interface AccountInfoItemProps {
  label: string;
  value: string;
}

function AccountInfoItem({ label, value }: AccountInfoItemProps) {
  return (
    <AccountInfoRow>
      <InfoLabel>{label}</InfoLabel>
      <ValueBox>
        <ValueText>{value}</ValueText>
      </ValueBox>
    </AccountInfoRow>
  );
}

export default AccountInfoItem;
