import styled from '@emotion/styled';
import { SuperAdminDashboard } from '@@types/index';
import { colFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';
import UserStatsSection from './UserStatsSection';
import WorkspaceStatsSection from './WorkspaceStatsSection';
import RevenueStatsSection from './RevenueStatsSection';

const Stack = styled.div`
  width: 100%;
  gap: 24px;
  ${colFlex()}

  ${mobileMediaQuery} {
    gap: 18px;
  }
`;

interface DashboardSectionsProps {
  data: SuperAdminDashboard;
}

function DashboardSections({ data }: DashboardSectionsProps) {
  return (
    <Stack>
      <UserStatsSection users={data.users} />
      <WorkspaceStatsSection workspaces={data.workspaces} />
      <RevenueStatsSection revenue={data.revenue} />
    </Stack>
  );
}

export default DashboardSections;
