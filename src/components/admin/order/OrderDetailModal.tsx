import { Order } from '@@types/index';
import RoundedAppButton from '@components/common/button/RoundedAppButton';
import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import ModalHeaderContents from './ModalHeaderContents';
import ModalMainContents from './ModalMainContents';

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

const ModalFooter = styled.div`
  ${rowFlex({ justify: 'space-between', align: 'center' })}
  padding-top: 15px;
  width: 100%;
`;

interface OrderDetailModalProps {
  isOpen: boolean;
  orderInfo: Order;
  onClose: () => void;
}

function OrderDetailModal({ isOpen, onClose, orderInfo }: OrderDetailModalProps) {
  if (!isOpen) return null;

  return (
    <>
      <ModalOverlay onClick={onClose} />
      <ModalContainer>
        <ModalHeaderContents onClose={onClose} orderInfo={orderInfo} />
        <ModalMainContents orderInfo={orderInfo} />
        <ModalFooter>
          <RoundedAppButton>주문 취소</RoundedAppButton>
          <RoundedAppButton>주문 확인</RoundedAppButton>
        </ModalFooter>
      </ModalContainer>
    </>
  );
}

export default OrderDetailModal;
