import { useEffect } from 'react';
import useAdminUser from '@hooks/admin/useAdminUser';
import AppContainer from '@components/common/container/AppContainer';
import AddWorkspace from '@components/common/workspace/AddWorkspace';
import WorkspaceContent from '@components/admin/workspace/WorkspaceContent';
import AdminHomeAccountOnboarding from '@components/admin/home/AdminHomeAccountOnboarding';
import { colFlex } from '@styles/flexStyles';
import { useAtomValue } from 'jotai';
import { adminUserAtom, adminWorkspacesAtom } from '@jotai/admin/atoms';
import AppFaqButton from '@components/common/button/AppFaqButton';
import styled from '@emotion/styled';

const Container = styled.div`
  width: 95%;
  ${colFlex({ align: 'center' })}
`;

function AdminHome() {
  const { fetchWorkspaces, fetchAdminUser } = useAdminUser();
  const workspaces = useAtomValue(adminWorkspacesAtom);
  const user = useAtomValue(adminUserAtom);
  const addWorkspaceNumber = 3 - workspaces.length;
  const isAccountRegistered = !!user.account?.accountNumber;

  useEffect(() => {
    Promise.allSettled([fetchWorkspaces(), fetchAdminUser()]).finally();
  }, []);

  if (!isAccountRegistered) {
    return (
      <AppContainer useFlex={colFlex({ justify: 'center', align: 'center' })} customGap={'30px'}>
        <AdminHomeAccountOnboarding />
      </AppContainer>
    );
  }

  return (
    <AppContainer useFlex={colFlex({ justify: 'center', align: 'center' })} customGap={'30px'}>
      <Container>
        <WorkspaceContent workspaces={workspaces}>
          {Array.from({ length: addWorkspaceNumber }).map((_, i) => (
            <AddWorkspace key={i} workspaces={workspaces} />
          ))}
        </WorkspaceContent>
        <AppFaqButton />
      </Container>
    </AppContainer>
  );
}

export default AdminHome;
