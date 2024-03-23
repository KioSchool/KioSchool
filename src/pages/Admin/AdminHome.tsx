import React, { useEffect, useRef, useState } from 'react';
import useAdminUser from '@hooks/useAdminUser';
import { useRecoilValue } from 'recoil';
import { workspacesAtom } from '@recoils/atoms';
import userDefaultProfileImage from '@resources/image/userDefaultProfileImage.png';
import kioLogo from '@resources/image/kioLogo.png';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import InputModal from '@components/common/modal/InputModal';
import Container from '@components/common/container/Container';
import DummyWorkspace from '@components/common/workspace/DummyWorkspace';
import AddWorkspace from '@components/common/workspace/AddWorkspace';
import { AddWorkspaceModalContent } from '@components/common/content/AddworkspaceModalContent';
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
  const { fetchWorkspaces, createWorkspaces, leaveWorkspaces } = useAdminUser();

  const workspaceNameRef = useRef<HTMLInputElement>(null);
  const workspaceDescriptionRef = useRef<HTMLInputElement>(null);
  const workspaces = useRecoilValue(workspacesAtom);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  const createHandler = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const workspaceName = workspaceNameRef.current?.value;
    if (!workspaceName) {
      alert('workspace 이름을 입력해주세요');
      return;
    }

    const workspaceDescription = workspaceDescriptionRef.current?.value;
    if (!workspaceDescription) {
      alert('workspace 설명 입력해주세요');
      return;
    }

    createWorkspaces(workspaceName, workspaceDescription);
    setModalOpen(false);
  };

  const leaveHandler = (e: React.FormEvent, id: number) => {
    e.stopPropagation();
    leaveWorkspaces(id);
  };

  const setModalClose = () => {
    setModalOpen(false);
  };

  const openModal = () => {
    setModalOpen(true);
  };

  return (
    <>
      <Container justifyValue={'space-between'}>
        <>
          <NavContainer>
            <Link to={'/'}>
              <img src={kioLogo} width="170px" height="80px"></img>
            </Link>

            <LinkItem to={'/register-account'}>
              <img src={userDefaultProfileImage} width="60px" height="60px"></img>
            </LinkItem>
          </NavContainer>

          <WorkspaceContent workspaces={workspaces} leaveHandler={leaveHandler} />

          <AddWorkspace workspaces={workspaces} modalOpen={openModal} />
          <DummyWorkspace workspaces={workspaces} />
        </>
      </Container>

      {modalOpen && (
        <InputModal onClick={setModalClose} onSubmit={createHandler}>
          <AddWorkspaceModalContent workspaceDescriptionRef={workspaceDescriptionRef} workspaceNameRef={workspaceNameRef} />
        </InputModal>
      )}
    </>
  );
}

export default AdminHome;
