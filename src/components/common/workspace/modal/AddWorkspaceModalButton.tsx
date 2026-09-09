import styled from '@emotion/styled';
import { createPortal } from 'react-dom';
import { RiAddFill } from '@remixicon/react';
import AddWorkspaceModalContent from '@components/admin/workspace/AddworkspaceModalContent';
import useModal from '@hooks/useModal';
import { Color } from '@resources/colors';
import { colFlex } from '@styles/flexStyles';

const Container = styled.div``;

const AddButton = styled.button`
  width: 128px;
  height: 128px;
  padding: 0;
  border: none;
  border-radius: 16px;
  background: ${Color.WHITE};
  color: ${Color.GREY};
  font: inherit;
  cursor: pointer;
  ${colFlex({ justify: 'center', align: 'center' })};
`;

const PlusIcon = styled(RiAddFill)`
  width: 34px;
  height: 34px;
  transition: transform 0.1s ease;
  color: ${Color.GREY};
  flex-shrink: 0;

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

const ModalContainer = styled.div``;

function AddWorkspaceModalButton() {
  const { isModalOpen, openModal, closeModal, modalKey } = useModal();

  return (
    <Container>
      <AddButton type="button" aria-label="워크스페이스 추가" onClick={openModal}>
        <PlusIcon aria-hidden="true" />
      </AddButton>
      {isModalOpen &&
        createPortal(
          <ModalContainer>
            <ModalOverlay onClick={closeModal} className={'modal-overlay'} />
            <AddWorkspaceModalContent closeModal={closeModal} />
          </ModalContainer>,
          document.getElementById(modalKey) as HTMLElement,
        )}
    </Container>
  );
}

export default AddWorkspaceModalButton;
