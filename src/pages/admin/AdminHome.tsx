import { useEffect } from 'react';
import useAdminUser from '@hooks/admin/useAdminUser';
import AppContainer from '@components/common/container/AppContainer';
import AddWorkspace from '@components/common/workspace/AddWorkspace';
import WorkspaceContent from '@components/admin/workspace/WorkspaceContent';
import AppFooter from '@components/common/footer/AppFooter';
import { rowFlex } from '@styles/flexStyles';
import { useAtomValue } from 'jotai';
import { adminUserAtom, adminWorkspacesAtom } from 'src/jotai/admin/atoms';
import AppFaqButton from '@components/common/button/AppFaqButton';

function AdminHome() {
  const { fetchWorkspaces, fetchAdminUser } = useAdminUser();
  const workspaces = useAtomValue(adminWorkspacesAtom);
  const user = useAtomValue(adminUserAtom);
  const addWorkspaceNumber = 3 - workspaces.length;

  useEffect(() => {
    fetchWorkspaces();
    fetchAdminUser();
  }, []);

  return (
    <AppContainer useFlex={rowFlex({ justify: 'space-between' })} titleNavBarProps={{ title: `${user.name}님의 주점`, useBackIcon: false }}>
      <>
        <WorkspaceContent workspaces={workspaces} />
        {Array.from({ length: addWorkspaceNumber }).map((_, i) => (
          <AddWorkspace key={i} workspaces={workspaces} />
        ))}
        <AppFooter />
        <AppFaqButton />
      </>
    </AppContainer>
  );
}

export default AdminHome;
