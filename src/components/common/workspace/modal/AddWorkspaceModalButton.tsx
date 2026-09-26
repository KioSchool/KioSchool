import styled from '@emotion/styled';
import { createPortal } from 'react-dom';
import { RiAddFill } from '@remixicon/react';
import AddWorkspaceModalContent from '@components/admin/workspace/AddworkspaceModalContent';
import useModal from '@hooks/useModal';
import { Color } from '@resources/colors';
import { colFlex } from '@styles/flexStyles';

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const PlusIcon = styled(RiAddFill)`
  box-sizing: border-box;
  width: 48px;
  height: 48px;
  padding: 10px;
  border-radius: 50%;
  background: ${Color.WHITE};
  box-shadow: 0px 2px 8px rgba(92, 92, 92, 0.12);
  transition: transform 0.1s ease;
  color: ${Color.KIO_ORANGE};
  flex-shrink: 0;
`;

const AddButton = styled.button`
  width: 100%;
  height: 100%;
  padding: 24px;
  gap: 10px;
  border: none;
  border-radius: 16px;
  background: transparent;
  color: ${Color.GREY};
  font: inherit;
  cursor: pointer;

  &:hover .plus-icon {
    transform: scale(1.1);
  }

  &:focus-visible {
    outline: 2px solid ${Color.KIO_ORANGE};
    outline-offset: -2px;
  }

  ${colFlex({ justify: 'center', align: 'center' })};
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

interface AddWorkspaceModalButtonProps {
  children?: React.ReactNode;
}

function AddWorkspaceModalButton({ children }: AddWorkspaceModalButtonProps) {
  const { isModalOpen, openModal, closeModal, modalKey } = useModal();

  return (
    <Container>
      <AddButton type="button" aria-label="워크스페이스 추가" onClick={openModal}>
        <PlusIcon aria-hidden="true" className={'plus-icon'} />
        {children}
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
