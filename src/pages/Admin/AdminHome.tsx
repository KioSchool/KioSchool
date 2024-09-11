import React, { useEffect } from 'react';
import useAdminUser from '@hooks/admin/useAdminUser';
import { useRecoilValue } from 'recoil';
import { adminUserAtom, workspacesAtom } from '@recoils/atoms';
import TestContainer from '@components/common/container/TestContainer';
import DummyWorkspace from '@components/common/workspace/DummyWorkspace';
import AddWorkspace from '@components/common/workspace/AddWorkspace';
import WorkspaceContent from '@components/admin/workspace/WorkspaceContent';
import styled from '@emotion/styled';
import AppFooter from '@components/common/footer/AppFooter';
import { rowFlex } from '@styles/flexStyles';

const UserNameContainer = styled.div`
  padding-bottom: 25px;
  width: 100%;
  height: 80px;
`;

const UserNameText = styled.div`
  display: inline-block;
  font-size: 60px;
  font-weight: 800;
`;

const DescriptionText = styled.div`
  display: inline-block;
  font-size: 60px;
  font-weight: 500;
`;

function AdminHome() {
  const { fetchWorkspaces, fetchAdminUser } = useAdminUser();
  const workspaces = useRecoilValue(workspacesAtom);
  const user = useRecoilValue(adminUserAtom);

  useEffect(() => {
    fetchWorkspaces();
    fetchAdminUser();
  }, []);

  return (
    <TestContainer useFlex={rowFlex({ justify: 'space-between' })}>
      <>
        <UserNameContainer className={'username-container'}>
          <UserNameText className={'username'}>{user.name}</UserNameText>
          <DescriptionText className={'description'}>님의 주점</DescriptionText>
        </UserNameContainer>
        <WorkspaceContent workspaces={workspaces} />
        <AddWorkspace workspaces={workspaces} />
        <DummyWorkspace workspaces={workspaces} />
        <AppFooter />
      </>
    </TestContainer>
  );
}

export default AdminHome;
