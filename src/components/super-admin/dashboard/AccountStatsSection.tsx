import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { RiBankLine } from '@remixicon/react';
import { AccountConnectionStatus, UserAccountFilter } from '@@types/index';
import { Color } from '@resources/colors';
import { formatNumber } from '@utils/formatNumber';
import { colFlex } from '@styles/flexStyles';
import { getSuperAdminUserPath } from '@constants/routes';
import StatCard from './StatCard';
import StatCardIcon from './StatCardIcon';
import StatGrid from './StatGrid';
import SectionTitle from './SectionTitle';
import ProgressIndicator from './ProgressIndicator';

const Section = styled.div``;

const FooterColumn = styled.div`
  gap: 2px;
  ${colFlex()}
`;

const FooterHint = styled.span`
  font-size: 10px;
  color: ${Color.HEAVY_GREY};
`;

const DrillDownButton = styled.button`
  align-self: flex-start;
  margin-top: 4px;
  padding: 0;
  border: none;
  background: none;
  font-size: 11px;
  font-weight: 600;
  color: ${Color.GREY};
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    color: ${Color.KIO_ORANGE_DARK};
  }
`;

const toPercent = (rate: number) => `${(rate * 100).toFixed(1)}%`;

interface AccountStatsSectionProps {
  account: AccountConnectionStatus;
}

function AccountStatsSection({ account }: AccountStatsSectionProps) {
  const navigate = useNavigate();
  const usersWithoutToss = account.usersWithAccount - account.usersWithToss;

  const handleDrillDown = (accountFilter: UserAccountFilter) => {
    navigate(getSuperAdminUserPath({ accountFilter }));
  };

  const icon = (
    <StatCardIcon>
      <RiBankLine size={18} />
    </StatCardIcon>
  );

  return (
    <Section>
      <SectionTitle>계좌 연동</SectionTitle>
      <StatGrid>
        <StatCard
          icon={icon}
          label="계좌 연동률"
          value={toPercent(account.connectionRate)}
          footer={
            <FooterColumn>
              <ProgressIndicator rate={account.connectionRate} />
              <FooterHint>
                전체 {formatNumber(account.totalUsers)}명 중 {formatNumber(account.usersWithAccount)}명 연동 · 미연동{' '}
                {formatNumber(account.usersWithoutAccount)}명
              </FooterHint>
              <DrillDownButton type="button" onClick={() => handleDrillDown('NOT_CONNECTED')}>
                미연동 사용자 보기
              </DrillDownButton>
            </FooterColumn>
          }
        />
        <StatCard
          icon={icon}
          label="전체 대비 토스 보급률"
          value={toPercent(account.tossRateOfTotal)}
          footer={
            <FooterColumn>
              <ProgressIndicator rate={account.tossRateOfTotal} />
              <FooterHint>
                전체 {formatNumber(account.totalUsers)}명 중 {formatNumber(account.usersWithToss)}명
              </FooterHint>
            </FooterColumn>
          }
        />
        <StatCard
          icon={icon}
          label="계좌 연동자 중 토스 전환율"
          value={toPercent(account.tossRateOfAccount)}
          footer={
            <FooterColumn>
              <ProgressIndicator rate={account.tossRateOfAccount} />
              <FooterHint>
                계좌 연동 {formatNumber(account.usersWithAccount)}명 중 {formatNumber(account.usersWithToss)}명
              </FooterHint>
              <DrillDownButton type="button" onClick={() => handleDrillDown('TOSS_NOT_CONNECTED')}>
                토스 미연동 {formatNumber(usersWithoutToss)}명 보기
              </DrillDownButton>
            </FooterColumn>
          }
        />
      </StatGrid>
    </Section>
  );
}

export default AccountStatsSection;
