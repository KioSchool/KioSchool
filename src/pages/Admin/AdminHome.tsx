import React, { useEffect } from 'react';
import useAdminUser from '@hooks/useAdminUser';
import { useRecoilValue } from 'recoil';
import { workspacesAtom } from '@recoils/atoms';
import userDefaultProfileImage from '@resources/image/userDefaultProfileImage.png';
import kioLogo from '@resources/image/kioLogo.png';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import Container from '@components/common/container/Container';
import DummyWorkspace from '@components/common/workspace/DummyWorkspace';
import AddWorkspace from '@components/common/workspace/AddWorkspace';
import WorkspaceContent from '@components/common/content/WorkspaceContent';

const NavContainer = styled.div`
  padding-bottom: 40px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const LinkItem = styled(Link)`
  width: 60px;
  height: 60px;
`;

function AdminHome() {
  const { fetchWorkspaces, leaveWorkspaces } = useAdminUser();
  const workspaces = useRecoilValue(workspacesAtom);

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  const leaveHandler = (e: React.FormEvent, id: number) => {
    e.stopPropagation();
    const userInput = window.confirm('정말 삭제하시겠습니까?');
    if (userInput) leaveWorkspaces(id);
  };

  return (
    <>
      <Container justifyValue={'space-between'}>
        <>
          <NavContainer>
            <Link to={'/'}>
              <img src={kioLogo} width="170px" height="80px" />
            </Link>

            <LinkItem to={'/register-account'}>
              <img src={userDefaultProfileImage} width="60px" height="60px" />
            </LinkItem>
          </NavContainer>

          <WorkspaceContent workspaces={workspaces} leaveHandler={leaveHandler} />

          <AddWorkspace workspaces={workspaces} />
          <DummyWorkspace workspaces={workspaces} />
        </>
      </Container>
    </>
  );
}

export default AdminHome;
