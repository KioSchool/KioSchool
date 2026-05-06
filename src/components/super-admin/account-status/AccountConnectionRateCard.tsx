import styled from '@emotion/styled';
import { AccountConnectionStatus } from '@@types/index';
import { Color } from '@resources/colors';
import { colFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';
import { formatNumber } from '@utils/formatNumber';
import ProgressIndicator from '@components/super-admin/dashboard/ProgressIndicator';

const Card = styled.div`
  background: ${Color.WHITE};
  border: 1px solid #f0f0f0;
  border-radius: 12px;
  padding: 20px;
  gap: 12px;
  ${colFlex()}

  ${mobileMediaQuery} {
    padding: 16px;
    gap: 10px;
    border-radius: 10px;
  }
`;

const RateValue = styled.div`
  font-size: 32px;
  font-weight: 700;
  color: ${Color.BLACK};
  line-height: 1.1;
  letter-spacing: -0.02em;

  ${mobileMediaQuery} {
    font-size: 26px;
  }
`;

const RateLabel = styled.div`
  font-size: 12px;
  color: ${Color.GREY};
  font-weight: 500;
`;

const Caption = styled.div`
  font-size: 12px;
  color: ${Color.GREY};
`;

interface AccountConnectionRateCardProps {
  status: AccountConnectionStatus;
}

function AccountConnectionRateCard({ status }: AccountConnectionRateCardProps) {
  const ratePercent = `${(status.connectionRate * 100).toFixed(1)}%`;
  return (
    <Card>
      <RateLabel>계좌 연동률</RateLabel>
      <RateValue>{ratePercent}</RateValue>
      <ProgressIndicator rate={status.connectionRate} />
      <Caption>
        전체 {formatNumber(status.totalUsers)}명 중 {formatNumber(status.usersWithAccount)}명이 연동됨
      </Caption>
    </Card>
  );
}

export default AccountConnectionRateCard;
