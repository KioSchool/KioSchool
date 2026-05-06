import { useEffect, useState } from 'react';
import { match } from 'ts-pattern';
import styled from '@emotion/styled';
import AppContainer from '@components/common/container/AppContainer';
import PageHeader from '@components/common/page/PageHeader';
import SuperAdminPageContainer from '@components/super-admin/SuperAdminPageContainer';
import AccountConnectionRateCard from '@components/super-admin/account-status/AccountConnectionRateCard';
import AccountBreakdownList from '@components/super-admin/account-status/AccountBreakdownList';
import useSuperAdminAccount from '@hooks/super-admin/useSuperAdminAccount';
import { AccountConnectionStatus } from '@@types/index';
import { Color } from '@resources/colors';
import { colFlex } from '@styles/flexStyles';

const LoadingText = styled.div`
  font-size: 14px;
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
    <AppContainer
      useFlex={colFlex({ align: 'center' })}
      backgroundColor={Color.LIGHT_GREY}
      useTitle={false}
    >
      <SuperAdminPageContainer>
        <PageHeader
          title="계좌 연동 현황"
          description="계좌 연동률과 미연동 사용자 분포를 확인합니다."
        />
        {match(status)
          .with(null, () => <LoadingText>불러오는 중...</LoadingText>)
          .otherwise((data) => (
            <>
              <AccountConnectionRateCard status={data} />
              <AccountBreakdownList status={data} />
            </>
          ))}
      </SuperAdminPageContainer>
    </AppContainer>
  );
}

export default SuperAdminAccountStatus;
