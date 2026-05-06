import styled from '@emotion/styled';
import { RiUser3Line } from '@remixicon/react';
import { UserStats } from '@@types/index';
import { formatNumber } from '@utils/formatNumber';
import { rowFlex } from '@styles/flexStyles';
import StatCard from './StatCard';
import StatCardIcon from './StatCardIcon';
import StatTrendItem from './StatTrendItem';
import StatGrid from './StatGrid';
import SectionTitle from './SectionTitle';

const TrendRow = styled.div`
  gap: 12px;
  ${rowFlex()}
`;

interface UserStatsSectionProps {
  users: UserStats;
}

function UserStatsSection({ users }: UserStatsSectionProps) {
  return (
    <div>
      <SectionTitle>유저</SectionTitle>
      <StatGrid>
        <StatCard
          icon={
            <StatCardIcon>
              <RiUser3Line size={18} />
            </StatCardIcon>
          }
          label="전체 가입자"
          value={formatNumber(users.total)}
          footer={
            <TrendRow>
              <StatTrendItem label="7일" delta={users.newLast7Days} />
              <StatTrendItem label="30일" delta={users.newLast30Days} />
            </TrendRow>
          }
        />
        <StatCard
          icon={
            <StatCardIcon>
              <RiUser3Line size={18} />
            </StatCardIcon>
          }
          label="최근 7일 신규 가입"
          value={formatNumber(users.newLast7Days)}
        />
        <StatCard
          icon={
            <StatCardIcon>
              <RiUser3Line size={18} />
            </StatCardIcon>
          }
          label="최근 30일 신규 가입"
          value={formatNumber(users.newLast30Days)}
        />
      </StatGrid>
    </div>
  );
}

export default UserStatsSection;
