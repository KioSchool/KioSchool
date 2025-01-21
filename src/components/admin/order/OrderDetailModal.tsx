import { Order } from '@@types/index';
import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { colFlex } from '@styles/flexStyles';
import ModalHeaderContents from './ModalHeaderContents';
import ModalMainContents from './ModalMainContents';
import ModalFooterContents from './ModalFooterContents';

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
  ${colFlex()}
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${Color.WHITE};
  border-radius: 10px;
  width: 700px;
  height: 600px;
  padding: 40px;
  z-index: 2001;
  gap: 15px;
`;

interface OrderDetailModalProps {
  isOpen: boolean;
  order: Order;
  onClose: () => void;
}

function OrderDetailModal({ isOpen, onClose, order }: OrderDetailModalProps) {
  if (!isOpen) return null;

  return (
    <>
      <ModalOverlay onClick={onClose} />
      <ModalContainer>
        <ModalHeaderContents onClose={onClose} order={order} />
        <ModalMainContents order={order} />
        <ModalFooterContents orderStatus={order.status} id={order.id} />
      </ModalContainer>
    </>
  );
}

export default OrderDetailModal;
