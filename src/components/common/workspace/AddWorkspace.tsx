import styled from '@emotion/styled';
import plusLogo from '../../../resources/image/plusLogo.png';
import { Workspace } from '@@types/index';
import useAdminUser from '@hooks/useAdminUser';
import { useRef, useState } from 'react';
import InputModal from '../modal/InputModal';
import { AddWorkspaceModalContent } from '../content/AddworkspaceModalContent';

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

type WrapperProps = {
  workspaces: Workspace[];
};

const AddWorkspace = ({ workspaces }: WrapperProps) => {
  const maxWorkspaceNum = 3;
  const { createWorkspaces } = useAdminUser();
  const workspaceNameRef = useRef<HTMLInputElement>(null);
  const workspaceDescriptionRef = useRef<HTMLInputElement>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

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

  const closeModal = () => {
    setModalOpen(false);
  };

  if (workspaces.length >= maxWorkspaceNum) return null;

  return (
    <>
      <AddWorkspaceContainer onClick={() => setModalOpen(true)}>
        <img src={plusLogo} width={'51px'} height={'51px'}></img>
      </AddWorkspaceContainer>

      {modalOpen && (
        <InputModal closeModal={closeModal} createHandler={createHandler}>
          <AddWorkspaceModalContent workspaceDescriptionRef={workspaceDescriptionRef} workspaceNameRef={workspaceNameRef} />
        </InputModal>
      )}
    </>
  );
};

export default AddWorkspace;
