import { Order } from '@@types/index';
import AppLabel from '@components/common/label/AppLabel';
import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';

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
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${Color.WHITE};
  border-radius: 10px;
  width: 500px;
  padding: 20px;
  z-index: 2001;
`;

const ModalHeader = styled.div`
  ${colFlex({ align: 'start' })}
  border-bottom: 1px solid ${Color.LIGHT_GREY};
  padding-bottom: 10px;
  margin-bottom: 15px;
`;

const ModalContent = styled.div`
  ${colFlex({ justify: 'space-between', align: 'start' })}
  gap: 10px;
`;

const ModalFooter = styled.div`
  ${rowFlex({ justify: 'flex-end' })}
  margin-top: 20px;
`;

const CloseButton = styled.button`
  background-color: ${Color.KIO_ORANGE};
  color: ${Color.WHITE};
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;

  &:hover {
    background-color: ${Color.KIO_ORANGE};
  }
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
        <ModalHeader>
          <AppLabel size={17} style={{ fontWeight: 800 }}>{`주문번호 ${orderInfo.tableNumber + 1}`}</AppLabel>
          <AppLabel size={13}>{`주문시각 | ${new Date(orderInfo.createdAt).toLocaleString()}`}</AppLabel>
        </ModalHeader>
        <ModalContent>
          {orderInfo.orderProducts.map((product, index) => (
            <AppLabel key={index} size={14}>
              {`${product.productName} x ${product.quantity} | ${product.productPrice.toLocaleString()}원`}
            </AppLabel>
          ))}
          <AppLabel size={15} style={{ fontWeight: 700 }}>{`상품합계: ${orderInfo.totalPrice.toLocaleString()}원`}</AppLabel>
        </ModalContent>
        <ModalFooter>
          <CloseButton onClick={onClose}>닫기</CloseButton>
        </ModalFooter>
      </ModalContainer>
    </>
  );
}

export default OrderDetailModal;
