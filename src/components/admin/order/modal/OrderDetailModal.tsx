import { Order } from '@@types/index';
import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { colFlex } from '@styles/flexStyles';
import OrderModalFooterContents from '@components/admin/order/modal/OrderModalFooterContents';
import OrderModalMainContents from '@components/admin/order/modal/OrderModalMainContents';
import OrderModalHeaderContents from '@components/admin/order/modal/OrderModalHeaderContents';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import useModal from '@hooks/useModal';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2px);
  z-index: 2000;
`;

const ModalContainer = styled.div`
  ${colFlex({ justify: 'center' })}
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${Color.WHITE};
  border-radius: 10px;
  width: 700px;
  z-index: 2001;
  gap: 15px;
`;

interface Props {
  order: Order;
  isModalOpen: boolean;
  closeModal: () => void;
}
function OrderDetailModal({ order, isModalOpen, closeModal }: Props) {
  const { modalKey } = useModal();
  useEffect(() => {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    });
  }, []);

  if (!isModalOpen) {
    return null;
  }

  return createPortal(
    <>
      <ModalOverlay onClick={closeModal} />
      <ModalContainer>
        <OrderModalHeaderContents onClose={closeModal} order={order} />
        <OrderModalMainContents order={order} />
        <OrderModalFooterContents orderStatus={order.status} id={order.id} closeModal={closeModal} />
      </ModalContainer>
    </>,
    document.getElementById(modalKey) as HTMLElement,
  );
}

export default OrderDetailModal;
