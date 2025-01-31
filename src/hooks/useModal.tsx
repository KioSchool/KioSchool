import { useState } from 'react';

function useModal() {
  const modalKey = 'modal-root';
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
    // 모달창 open 시 배경 스크롤 금지 코드
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalOpen(false);
    // 모달창 open 시 배경 스크롤 금지 해제 코드
    document.body.style.overflow = 'auto';
  };

  return { isModalOpen, openModal, closeModal, modalKey };
}

export default useModal;
