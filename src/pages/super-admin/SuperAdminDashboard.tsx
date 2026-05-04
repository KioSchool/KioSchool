import { useEffect, useState } from 'react';
import AppContainer from '@components/common/container/AppContainer';
import styled from '@emotion/styled';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { Color } from '@resources/colors';
import useSuperAdminDashboard from '@hooks/super-admin/useSuperAdminDashboard';
import useSuperAdminAccount from '@hooks/super-admin/useSuperAdminAccount';
import { AccountConnectionStatus, SuperAdminDashboard as SuperAdminDashboardData } from '@@types/index';
import { RiArrowUpLine, RiFileListLine, RiMoneyDollarCircleLine, RiStore3Line, RiUser3Line } from '@remixicon/react';

const PageContainer = styled.div`
  width: 100%;
  max-width: 1100px;
  padding: 72px 20px 40px;
  gap: 32px;
  ${colFlex()}
`;

const SectionTitle = styled.h1`
  font-size: 28px;
  font-weight: 800;
  color: ${Color.BLACK};
  margin: 0;
`;

const SectionSubTitle = styled.h2`
  font-size: 18px;
  font-weight: 700;
  color: ${Color.BLACK};
  margin: 0 0 16px 0;
`;

const GridRow = styled.div<{ cols: number }>`
  display: grid;
  grid-template-columns: repeat(${({ cols }) => cols}, 1fr);
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const StatCard = styled.div`
  background: ${Color.WHITE};
  border: 1px solid ${Color.HEAVY_GREY};
  border-radius: 16px;
  padding: 24px;
  gap: 12px;
  ${colFlex()}
`;

const CardIcon = styled.div<{ color: string }>`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: ${({ color }) => color}22;
  color: ${({ color }) => color};
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

const CardValue = styled.div`
  font-size: 32px;
  font-weight: 800;
  color: ${Color.BLACK};
  line-height: 1.1;
`;

const CardLabel = styled.div`
  font-size: 13px;
  color: ${Color.GREY};
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
`;

const CardSubRow = styled.div`
  gap: 16px;
  ${rowFlex()}
`;

const CardSubItem = styled.div<{ trend?: 'up' | 'down' | 'neutral' }>`
  font-size: 13px;
  font-weight: 600;
  color: ${({ trend }) => (trend === 'up' ? Color.GREEN : trend === 'down' ? Color.RED : Color.GREY)};
  gap: 2px;
  ${rowFlex({ align: 'center' })}
`;

const ProgressBarWrap = styled.div`
  gap: 8px;
  ${colFlex()}
`;

const ProgressBar = styled.div<{ rate: number }>`
  width: 100%;
  height: 8px;
  border-radius: 4px;
  background: ${Color.HEAVY_GREY};
  position: relative;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: ${({ rate }) => Math.min(rate * 100, 100)}%;
    border-radius: 4px;
    background: ${Color.KIO_ORANGE};
    transition: width 0.5s ease;
  }
`;

const ProgressLabel = styled.div`
  font-size: 13px;
  color: ${Color.GREY};
  ${rowFlex({ justify: 'space-between' })}
`;

const AccountStatusCard = styled.div`
  background: ${Color.WHITE};
  border: 1px solid ${Color.HEAVY_GREY};
  border-radius: 16px;
  padding: 24px;
  gap: 20px;
  ${colFlex()}
`;

const AccountRow = styled.div`
  gap: 8px;
  ${rowFlex({ align: 'center' })}
`;

const AccountDot = styled.div<{ color: string }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({ color }) => color};
  flex-shrink: 0;
`;

const AccountText = styled.div`
  font-size: 15px;
  color: ${Color.GREY};
  flex: 1;
`;

const AccountCount = styled.div`
  font-size: 15px;
  font-weight: 700;
  color: ${Color.BLACK};
`;

const LoadingText = styled.div`
  font-size: 16px;
  color: ${Color.GREY};
  text-align: center;
  padding: 60px 0;
`;

const formatNumber = (num: number) => num.toLocaleString('ko-KR');
const formatCurrency = (num: number) => `${formatNumber(num)}원`;

function SuperAdminDashboard() {
  const [dashboard, setDashboard] = useState<SuperAdminDashboardData | null>(null);
  const [accountStatus, setAccountStatus] = useState<AccountConnectionStatus | null>(null);
  const { fetchDashboard } = useSuperAdminDashboard();
  const { fetchAccountConnectionStatus } = useSuperAdminAccount();

  useEffect(() => {
    fetchDashboard().then(setDashboard);
    fetchAccountConnectionStatus().then(setAccountStatus);
  }, []);

  if (!dashboard) {
    return (
      <AppContainer useFlex={colFlex({ align: 'center', justify: 'center' })} backgroundColor={Color.LIGHT_GREY} useTitle={false}>
        <LoadingText>대시보드 불러오는 중...</LoadingText>
      </AppContainer>
    );
  }

  const { users, workspaces, revenue } = dashboard;

  return (
    <AppContainer useFlex={colFlex({ align: 'center' })} backgroundColor={Color.LIGHT_GREY} useTitle={false}>
      <PageContainer>
        <SectionTitle>서비스 현황 대시보드</SectionTitle>

        {/* 유저 통계 */}
        <div>
          <SectionSubTitle>👤 유저</SectionSubTitle>
          <GridRow cols={3}>
            <StatCard>
              <CardIcon color={Color.BLUE}>
                <RiUser3Line size={24} />
              </CardIcon>
              <CardLabel>전체 가입자</CardLabel>
              <CardValue>{formatNumber(users.total)}</CardValue>
              <CardSubRow>
                <CardSubItem trend="up">
                  <RiArrowUpLine size={14} />
                  7일 +{users.newLast7Days}
                </CardSubItem>
                <CardSubItem trend="up">
                  <RiArrowUpLine size={14} />
                  30일 +{users.newLast30Days}
                </CardSubItem>
              </CardSubRow>
            </StatCard>
            <StatCard>
              <CardIcon color={Color.GREEN}>
                <RiUser3Line size={24} />
              </CardIcon>
              <CardLabel>최근 7일 신규 가입</CardLabel>
              <CardValue>{users.newLast7Days}</CardValue>
            </StatCard>
            <StatCard>
              <CardIcon color={Color.KIO_ORANGE}>
                <RiUser3Line size={24} />
              </CardIcon>
              <CardLabel>최근 30일 신규 가입</CardLabel>
              <CardValue>{users.newLast30Days}</CardValue>
            </StatCard>
          </GridRow>
        </div>

        {/* 워크스페이스 통계 */}
        <div>
          <SectionSubTitle>🏪 워크스페이스</SectionSubTitle>
          <GridRow cols={3}>
            <StatCard>
              <CardIcon color={Color.KIO_ORANGE}>
                <RiStore3Line size={24} />
              </CardIcon>
              <CardLabel>전체 워크스페이스</CardLabel>
              <CardValue>{formatNumber(workspaces.total)}</CardValue>
              <CardSubRow>
                <CardSubItem trend="up">
                  <RiArrowUpLine size={14} />
                  7일 +{workspaces.newLast7Days}
                </CardSubItem>
                <CardSubItem trend="up">
                  <RiArrowUpLine size={14} />
                  30일 +{workspaces.newLast30Days}
                </CardSubItem>
              </CardSubRow>
            </StatCard>
            <StatCard>
              <CardIcon color={Color.GREEN}>
                <RiStore3Line size={24} />
              </CardIcon>
              <CardLabel>최근 30일 신규 생성</CardLabel>
              <CardValue>{workspaces.newLast30Days}</CardValue>
            </StatCard>
            <StatCard>
              <CardIcon color={Color.BLUE}>
                <RiStore3Line size={24} />
              </CardIcon>
              <CardLabel>온보딩 완료율</CardLabel>
              <CardValue>{(workspaces.onboardingCompletionRate * 100).toFixed(1)}%</CardValue>
              <ProgressBarWrap>
                <ProgressBar rate={workspaces.onboardingCompletionRate} />
                <ProgressLabel>
                  <span>0%</span>
                  <span>100%</span>
                </ProgressLabel>
              </ProgressBarWrap>
            </StatCard>
          </GridRow>
        </div>

        {/* 매출 통계 */}
        <div>
          <SectionSubTitle>💰 매출 & 주문</SectionSubTitle>
          <GridRow cols={4}>
            <StatCard>
              <CardIcon color={Color.GREEN}>
                <RiMoneyDollarCircleLine size={24} />
              </CardIcon>
              <CardLabel>전체 누적 매출</CardLabel>
              <CardValue style={{ fontSize: '22px' }}>{formatCurrency(revenue.totalRevenueAllTime)}</CardValue>
            </StatCard>
            <StatCard>
              <CardIcon color={Color.KIO_ORANGE}>
                <RiMoneyDollarCircleLine size={24} />
              </CardIcon>
              <CardLabel>최근 30일 매출</CardLabel>
              <CardValue style={{ fontSize: '22px' }}>{formatCurrency(revenue.totalRevenueLast30Days)}</CardValue>
            </StatCard>
            <StatCard>
              <CardIcon color={Color.BLUE}>
                <RiFileListLine size={24} />
              </CardIcon>
              <CardLabel>전체 누적 주문</CardLabel>
              <CardValue>{formatNumber(revenue.totalOrdersAllTime)}</CardValue>
            </StatCard>
            <StatCard>
              <CardIcon color={Color.GREY}>
                <RiFileListLine size={24} />
              </CardIcon>
              <CardLabel>최근 30일 주문</CardLabel>
              <CardValue>{formatNumber(revenue.totalOrdersLast30Days)}</CardValue>
            </StatCard>
          </GridRow>
        </div>

        {/* 계정 연동 현황 */}
        {accountStatus && (
          <div>
            <SectionSubTitle>🔗 계정 연동 현황</SectionSubTitle>
            <AccountStatusCard>
              <CardSubRow style={{ alignItems: 'center', justifyContent: 'space-between' }}>
                <CardValue style={{ fontSize: '24px' }}>{(accountStatus.connectionRate * 100).toFixed(1)}%</CardValue>
                <CardLabel>계좌 연동률</CardLabel>
              </CardSubRow>
              <ProgressBar rate={accountStatus.connectionRate} />
              <div style={{ gap: '12px', display: 'flex', flexDirection: 'column' }}>
                <AccountRow>
                  <AccountDot color={Color.KIO_ORANGE} />
                  <AccountText>계좌 연동 완료</AccountText>
                  <AccountCount>{formatNumber(accountStatus.usersWithAccount)}명</AccountCount>
                </AccountRow>
                <AccountRow>
                  <AccountDot color={Color.HEAVY_GREY} />
                  <AccountText>계좌 미연동</AccountText>
                  <AccountCount>{formatNumber(accountStatus.usersWithoutAccount)}명</AccountCount>
                </AccountRow>
                <AccountRow>
                  <AccountDot color={Color.BLUE} />
                  <AccountText>전체 유저</AccountText>
                  <AccountCount>{formatNumber(accountStatus.totalUsers)}명</AccountCount>
                </AccountRow>
              </div>
            </AccountStatusCard>
          </div>
        )}
      </PageContainer>
    </AppContainer>
  );
}

export default SuperAdminDashboard;
