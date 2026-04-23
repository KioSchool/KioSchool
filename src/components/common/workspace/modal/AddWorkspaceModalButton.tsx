import AddWorkspaceModalContent from '@components/admin/workspace/AddworkspaceModalContent';
import styled from '@emotion/styled';
import useModal from '@hooks/useModal';
import { createPortal } from 'react-dom';
import { RiAddFill } from '@remixicon/react';

const PlusIcon = styled(RiAddFill)`
  width: 34px;
  height: 34px;
  transition: transform 0.1s ease;
  color: #e8eef2;
  &:hover {
    transform: scale(1.2);
  }
`;

const ModalOverlay = styled.div`
  cursor: pointer;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1002;
`;

function AddWorkspaceModalButton() {
  const { isModalOpen, openModal, closeModal, modalKey } = useModal();

  if (!isModalOpen) {
    return <PlusIcon onClick={() => openModal()} />;
  }

  return createPortal(
    <>
      <ModalOverlay onClick={() => closeModal()} className={'modal-overlay'} />
      <AddWorkspaceModalContent closeModal={closeModal} />
    </>,
    document.getElementById(modalKey) as HTMLElement,
  );
}

export default AddWorkspaceModalButton;
