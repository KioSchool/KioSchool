import { Order } from '@@types/index';
import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { colFlex } from '@styles/flexStyles';
import OrderModalFooterContents from '@components/admin/order/realtime/modal/order-detail/OrderModalFooterContents';
import OrderModalMainContents from '@components/admin/order/realtime/modal/order-detail/OrderModalMainContents';
import OrderModalHeaderContents from '@components/admin/order/realtime/modal/order-detail/OrderModalHeaderContents';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import useModal from '@hooks/useModal';

const DetailModalContainer = styled.div``;

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
  border: 1px solid #e8eef2;
  width: 500px;
  z-index: 2001;
  gap: 12px;
  box-shadow: 0 4px 20px 0 rgba(92, 92, 92, 0.05);
  ${colFlex({ justify: 'center' })}
`;

interface Props {
  order: Order;
  isModalOpen: boolean;
  closeModal: () => void;
}

function OrderDetailModal({ order, isModalOpen, closeModal }: Props) {
  const { modalKey } = useModal();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, []);

  if (!isModalOpen) {
    return null;
  }

  return createPortal(
    <DetailModalContainer>
      <ModalOverlay onClick={closeModal} />
      <ModalContainer>
        <OrderModalHeaderContents onClose={closeModal} order={order} />
        <OrderModalMainContents order={order} />
        <OrderModalFooterContents orderStatus={order.status} id={order.id} closeModal={closeModal} />
      </ModalContainer>
    </DetailModalContainer>,
    document.getElementById(modalKey) as HTMLElement,
  );
}

export default OrderDetailModal;
