import styled from '@emotion/styled';
import { AccountConnectionStatus } from '@@types/index';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';
import { formatNumber } from '@utils/formatNumber';
import ProgressIndicator from '@components/super-admin/dashboard/ProgressIndicator';

const Wrap = styled.div`
  width: 100%;
  gap: 12px;
  ${colFlex()}
`;

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

const TossRateGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;

  ${mobileMediaQuery} {
    grid-template-columns: 1fr;
  }
`;

const TossRateCard = styled.div`
  background: ${Color.WHITE};
  border: 1px solid #f0f0f0;
  border-radius: 12px;
  padding: 16px;
  gap: 8px;
  ${colFlex()}

  ${mobileMediaQuery} {
    padding: 14px;
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

const TossRateValue = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: ${Color.BLACK};
  line-height: 1.1;
  letter-spacing: -0.02em;
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

const SectionTitle = styled.div`
  font-size: 11px;
  color: ${Color.GREY};
  text-transform: uppercase;
  letter-spacing: 0.04em;
  font-weight: 600;
`;

const TossBadge = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: #3182f6;
  background: #e8f0fe;
  border-radius: 4px;
  padding: 1px 6px;
  ${rowFlex({ align: 'center' })}
`;

const TossLabelRow = styled.div`
  gap: 6px;
  ${rowFlex({ align: 'center' })}
`;

interface AccountConnectionRateCardProps {
  status: AccountConnectionStatus;
}

function AccountConnectionRateCard({ status }: AccountConnectionRateCardProps) {
  const ratePercent = `${(status.connectionRate * 100).toFixed(1)}%`;
  const tossOfTotal = `${(status.tossRateOfTotal * 100).toFixed(1)}%`;
  const tossOfAccount = `${(status.tossRateOfAccount * 100).toFixed(1)}%`;

  return (
    <Wrap>
      <Card>
        <RateLabel>계좌 연동률</RateLabel>
        <RateValue>{ratePercent}</RateValue>
        <ProgressIndicator rate={status.connectionRate} />
        <Caption>
          전체 {formatNumber(status.totalUsers)}명 중 {formatNumber(status.usersWithAccount)}명이 연동됨
        </Caption>
      </Card>

      <SectionTitle>토스 연동률</SectionTitle>
      <TossRateGrid>
        <TossRateCard>
          <TossLabelRow>
            <RateLabel>전체 대비 토스 보급률</RateLabel>
            <TossBadge>Toss</TossBadge>
          </TossLabelRow>
          <TossRateValue>{tossOfTotal}</TossRateValue>
          <ProgressIndicator rate={status.tossRateOfTotal} />
          <Caption>
            전체 {formatNumber(status.totalUsers)}명 중 {formatNumber(status.usersWithToss)}명
          </Caption>
        </TossRateCard>
        <TossRateCard>
          <TossLabelRow>
            <RateLabel>계좌 연동자 중 토스 전환율</RateLabel>
            <TossBadge>Toss</TossBadge>
          </TossLabelRow>
          <TossRateValue>{tossOfAccount}</TossRateValue>
          <ProgressIndicator rate={status.tossRateOfAccount} />
          <Caption>
            계좌 연동 {formatNumber(status.usersWithAccount)}명 중 {formatNumber(status.usersWithToss)}명
          </Caption>
        </TossRateCard>
      </TossRateGrid>
    </Wrap>
  );
}

export default AccountConnectionRateCard;
