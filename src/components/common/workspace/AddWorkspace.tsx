import styled from '@emotion/styled';
import { Workspace } from '@@types/index';
import useAdminUser from '@hooks/admin/useAdminUser';
import React, { useRef, useState } from 'react';
import CreateWorkspaceModal from './modal/CreateWorkspaceModal';
import PlusIconSvg from '@resources/svg/PlusIconSvg';
import AddWorkspaceModalContent from '@components/admin/workspace/AddworkspaceModalContent';

const AddWorkspaceContainer = styled.form`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 321px;
  height: 332px;
  border-radius: 25px;
  border: 1px solid #000;
`;

interface Props {
  workspaces: Workspace[];
}

function AddWorkspace({ workspaces }: Props) {
  const maxWorkspaceNumber = 3;
  const { createWorkspaces } = useAdminUser();
  const workspaceNameRef = useRef<HTMLInputElement>(null);
  const workspaceDescriptionRef = useRef<HTMLInputElement>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const closeModal = () => {
    setModalOpen(false);
  };

  const createHandler = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const workspaceName = workspaceNameRef.current?.value;
    if (!workspaceName) {
      alert('주점 이름을 입력해주세요');
      return;
    }

    const workspaceDescription = workspaceDescriptionRef.current?.value;
    if (!workspaceDescription) {
      alert('주점 설명 입력해주세요');
      return;
    }

    createWorkspaces(workspaceName, workspaceDescription);
    closeModal();
  };

  if (workspaces.length >= maxWorkspaceNumber) return null;

  return (
    <>
      <AddWorkspaceContainer onClick={() => setModalOpen(true)}>
        <PlusIconSvg width={50} height={50} />
      </AddWorkspaceContainer>

      {modalOpen && (
        <CreateWorkspaceModal closeModal={closeModal} createHandler={createHandler}>
          <AddWorkspaceModalContent workspaceDescriptionRef={workspaceDescriptionRef} workspaceNameRef={workspaceNameRef} />
        </CreateWorkspaceModal>
      )}
    </>
  );
}

export default AddWorkspace;
