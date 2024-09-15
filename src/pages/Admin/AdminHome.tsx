import React, { useEffect } from 'react';
import useAdminUser from '@hooks/admin/useAdminUser';
import { useRecoilValue } from 'recoil';
import { adminUserAtom, workspacesAtom } from '@recoils/atoms';
import AppContainer from '@components/common/container/AppContainer';
import DummyWorkspace from '@components/common/workspace/DummyWorkspace';
import AddWorkspace from '@components/common/workspace/AddWorkspace';
import WorkspaceContent from '@components/admin/workspace/WorkspaceContent';
import AppFooter from '@components/common/footer/AppFooter';
import { rowFlex } from '@styles/flexStyles';

function AdminHome() {
  const { fetchWorkspaces, fetchAdminUser } = useAdminUser();
  const workspaces = useRecoilValue(workspacesAtom);
  const user = useRecoilValue(adminUserAtom);

  useEffect(() => {
    fetchWorkspaces();
    fetchAdminUser();
  }, []);

  return (
    <AppContainer useFlex={rowFlex({ justify: 'space-between' })} titleNavBarProps={{ title: `${user.name}님의 워크스페이스`, useArrow: false }}>
      <>
        <WorkspaceContent workspaces={workspaces} />
        <AddWorkspace workspaces={workspaces} />
        <DummyWorkspace workspaces={workspaces} />
        <AppFooter />
      </>
    </AppContainer>
  );
}

export default AdminHome;
