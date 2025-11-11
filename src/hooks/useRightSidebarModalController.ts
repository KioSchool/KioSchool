import { useMemo, useState, type ReactNode } from 'react';
import useModal from './useModal';

export interface RightSidebarModalPayload {
  title: string;
  subtitle?: string;
  content: ReactNode;
}

function useRightSidebarModalController(initialPayload?: RightSidebarModalPayload) {
  const { isModalOpen, openModal, closeModal } = useModal();
  const [payload, setPayload] = useState<RightSidebarModalPayload | null>(initialPayload ?? null);

  const open = (nextPayload: RightSidebarModalPayload) => {
    setPayload(nextPayload);
    openModal();
  };

  const close = () => {
    closeModal();
    setPayload(initialPayload ?? null);
  };

  const modalProps = useMemo(
    () => ({
      title: payload?.title ?? initialPayload?.title ?? '',
      subtitle: payload?.subtitle ?? initialPayload?.subtitle,
      isOpen: isModalOpen,
      onClose: close,
      children: payload?.content ?? initialPayload?.content ?? null,
    }),
    [payload, initialPayload, isModalOpen],
  );

  return { modalProps, open, close };
}

export default useRightSidebarModalController;
