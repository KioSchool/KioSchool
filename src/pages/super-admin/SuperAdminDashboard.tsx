import { useEffect, useState } from 'react';
import { match } from 'ts-pattern';
import styled from '@emotion/styled';
import AppContainer from '@components/common/container/AppContainer';
import PageHeader from '@components/common/page/PageHeader';
import SuperAdminPageContainer from '@components/super-admin/SuperAdminPageContainer';
import DashboardSections from '@components/super-admin/dashboard/DashboardSections';
import useSuperAdminDashboard from '@hooks/super-admin/useSuperAdminDashboard';
import useSuperAdminAccount from '@hooks/super-admin/useSuperAdminAccount';
import { AccountConnectionStatus, SuperAdminDashboard as SuperAdminDashboardData } from '@@types/index';
import { Color } from '@resources/colors';
import { colFlex } from '@styles/flexStyles';

const LoadingText = styled.div`
  font-size: 14px;
  color: ${Color.GREY};
  text-align: center;
  padding: 60px 0;
`;

function SuperAdminDashboard() {
  const [dashboard, setDashboard] = useState<SuperAdminDashboardData | null>(null);
  const [account, setAccount] = useState<AccountConnectionStatus | null>(null);
  const { fetchDashboard } = useSuperAdminDashboard();
  const { fetchAccountConnectionStatus } = useSuperAdminAccount();

  useEffect(() => {
    fetchDashboard().then(setDashboard);
    fetchAccountConnectionStatus().then(setAccount);
  }, [fetchDashboard, fetchAccountConnectionStatus]);

  return (
    <AppContainer useFlex={colFlex({ align: 'center' })} useTitle={false}>
      <SuperAdminPageContainer>
        <PageHeader title="서비스 현황 대시보드" description="유저·계좌 연동·워크스페이스·매출 통계를 한눈에 봅니다." />
        {match(dashboard)
          .with(null, () => <LoadingText>대시보드 불러오는 중...</LoadingText>)
          .otherwise((data) => (
            <DashboardSections data={data} account={account} />
          ))}
      </SuperAdminPageContainer>
    </AppContainer>
  );
}

export default SuperAdminDashboard;
