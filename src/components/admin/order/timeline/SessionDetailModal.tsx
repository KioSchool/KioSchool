import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styled from '@emotion/styled';
import { OrderSessionWithOrder } from '@@types/index';
import { Color } from '@resources/colors';
import { colFlex } from '@styles/flexStyles';
import { MODAL_ROOT_KEY } from '@hooks/useModal';
import { timelineColors } from './timelineConstants';
import SessionModalHeaderContents from './SessionModalHeaderContents';
import SessionModalMainContents from './SessionModalMainContents';
import SessionModalFooterContents from './SessionModalFooterContents';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(70, 74, 77, 0.3);
  backdrop-filter: blur(2px);
  z-index: 2000;
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${Color.WHITE};
  border-radius: 10px;
  border: 1px solid ${timelineColors.BORDER_CARD};
  width: 520px;
  max-width: 90vw;
  height: 70vh;
  max-height: 620px;
  z-index: 2001;
  box-shadow: 0 4px 20px 0 rgba(92, 92, 92, 0.05);
  overflow: hidden;
  ${colFlex()}
`;

interface SessionDetailModalProps {
  session: OrderSessionWithOrder;
  currentTime: Date;
  isModalOpen: boolean;
  closeModal: () => void;
}

function SessionDetailModal({ session, currentTime, isModalOpen, closeModal }: SessionDetailModalProps) {
  const totalPrice = session.totalOrderPrice;

  useEffect(() => {
    if (!isModalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen, closeModal]);

  if (!isModalOpen) return null;

  const portalRoot = document.getElementById(MODAL_ROOT_KEY);

  if (!portalRoot) return null;

  return createPortal(
    <>
      <ModalOverlay onClick={closeModal} />
      <ModalContainer role="dialog" aria-modal="true" aria-labelledby="session-modal-title">
        <SessionModalHeaderContents session={session} currentTime={currentTime} onClose={closeModal} />
        <SessionModalMainContents session={session} />
        <SessionModalFooterContents totalPrice={totalPrice} />
      </ModalContainer>
    </>,
    portalRoot,
  );
}

export default SessionDetailModal;
