import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { match } from 'ts-pattern';
import AppContainer from '@components/common/container/AppContainer';
import AccountConnectionRateCard from '@components/super-admin/account-status/AccountConnectionRateCard';
import AccountBreakdownList from '@components/super-admin/account-status/AccountBreakdownList';
import useSuperAdminAccount from '@hooks/super-admin/useSuperAdminAccount';
import { AccountConnectionStatus } from '@@types/index';
import { Color } from '@resources/colors';
import { colFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';

const PageContainer = styled.div`
  width: 100%;
  max-width: 640px;
  padding: 72px 24px 40px;
  gap: 16px;
  min-width: 0;
  ${colFlex()}

  ${mobileMediaQuery} {
    padding: 56px 14px 24px;
    gap: 12px;
  }
`;

const PageTitle = styled.h1`
  font-size: 22px;
  font-weight: 700;
  color: ${Color.BLACK};
  margin: 0;
  letter-spacing: -0.01em;

  ${mobileMediaQuery} {
    font-size: 18px;
  }
`;

const LoadingText = styled.div`
  font-size: 16px;
  color: ${Color.GREY};
  text-align: center;
  padding: 60px 0;
`;

function SuperAdminAccountStatus() {
  const [status, setStatus] = useState<AccountConnectionStatus | null>(null);
  const { fetchAccountConnectionStatus } = useSuperAdminAccount();

  useEffect(() => {
    fetchAccountConnectionStatus().then(setStatus);
  }, [fetchAccountConnectionStatus]);

  return (
    <AppContainer useFlex={colFlex({ align: 'center' })} backgroundColor={Color.LIGHT_GREY} useTitle={false} disableLayoutScale>
      <PageContainer>
        <PageTitle>계정 연동 현황</PageTitle>
        {match(status)
          .with(null, () => <LoadingText>불러오는 중...</LoadingText>)
          .otherwise((data) => (
            <>
              <AccountConnectionRateCard status={data} />
              <AccountBreakdownList status={data} />
            </>
          ))}
      </PageContainer>
    </AppContainer>
  );
}

export default SuperAdminAccountStatus;
