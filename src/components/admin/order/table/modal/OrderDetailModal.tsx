import { Order } from '@@types/index';
import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import OrderModalHeaderContents from '@components/admin/order/realtime/modal/order-detail/OrderModalHeaderContents';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import useModal from '@hooks/useModal';
import OrderModalMainContents from './OrderModalMainContents';

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
const ModalFooter = styled.div`
  padding: 15px 40px 40px 40px;
  ${rowFlex({ justify: 'space-between', align: 'center' })}
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

    return () => {
      document.body.style.overflow = 'auto';
    };
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
        <ModalFooter />
      </ModalContainer>
    </>,
    document.getElementById(modalKey) as HTMLElement,
  );
}

export default OrderDetailModal;
