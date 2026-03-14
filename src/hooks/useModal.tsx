import { useCallback, useEffect, useState } from 'react';

export const MODAL_ROOT_KEY = 'modal-root';

function useModal() {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = useCallback(() => {
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    document.body.style.overflow = 'auto';
  }, []);

  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return { isModalOpen, openModal, closeModal, modalKey: MODAL_ROOT_KEY };
}

export default useModal;
