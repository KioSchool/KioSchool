import React, { useEffect } from 'react';
import useAdminUser from '@hooks/useAdminUser';
import { useRecoilValue } from 'recoil';
import { workspacesAtom } from '@recoils/atoms';
import Container from '@components/common/container/Container';
import DummyWorkspace from '@components/common/workspace/DummyWorkspace';
import AddWorkspace from '@components/common/workspace/AddWorkspace';
import WorkspaceContent from '@components/common/content/WorkspaceContent';
import NavBar from '@components/common/nav/NavBar';

function AdminHome() {
  const { fetchWorkspaces } = useAdminUser();
  const workspaces = useRecoilValue(workspacesAtom);

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  return (
    <Container justifyValue={'space-between'}>
      <>
        <NavBar logoSize={'medium'} />

        <WorkspaceContent workspaces={workspaces} />

        <AddWorkspace workspaces={workspaces} />
        <DummyWorkspace workspaces={workspaces} />
      </>
    </Container>
  );
}

export default AdminHome;
