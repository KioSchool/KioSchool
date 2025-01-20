import { Order, OrderStatus } from '@@types/index';
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
  width: 700px;
  height: 600px;
  padding: 30px;
  z-index: 2001;
`;

const ModalHeader = styled.div`
  ${colFlex({ align: 'start' })}
  gap: 10px;
  border-bottom: 20px solid ${Color.LIGHT_GREY};
`;

const HeaderDetailContainer = styled.div`
  ${rowFlex({ justify: 'space-between', align: 'center' })}
  width: 100%;
`;

const HeaderDetail = styled.div`
  ${colFlex({ align: 'start' })}
  gap: 10px;
`;

const ModalContent = styled.div`
  ${colFlex({ justify: 'space-between', align: 'start' })}
  gap: 10px;
`;

const ModalFooter = styled.div`
  ${rowFlex({ justify: 'flex-end' })}
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

const orderStatusMap: Record<OrderStatus, string> = {
  [OrderStatus.NOT_PAID]: '주문 완료',
  [OrderStatus.PAID]: '결제 완료',
  [OrderStatus.SERVED]: '서빙 완료',
  [OrderStatus.CANCELLED]: '취소됨',
};

function OrderDetailModal({ isOpen, onClose, orderInfo }: OrderDetailModalProps) {
  if (!isOpen) return null;

  return (
    <>
      <ModalOverlay onClick={onClose} />
      <ModalContainer>
        <ModalHeader>
          <AppLabel color={Color.BLACK} size={17} style={{ fontWeight: 800 }}>{`주문번호 ${orderInfo.tableNumber + 1}`}</AppLabel>
          <HeaderDetailContainer>
            <HeaderDetail>
              <AppLabel color={Color.BLACK} size={13}>{`테이블 ${orderInfo.tableNumber + 1}`}</AppLabel>
              <AppLabel color={Color.BLACK} size={13}>{`주문일시 | ${new Date(orderInfo.createdAt).toLocaleString()}`}</AppLabel>
            </HeaderDetail>
            <AppLabel color={Color.KIO_ORANGE} size={17} style={{ fontWeight: 600 }}>
              {orderStatusMap[orderInfo.status]}
            </AppLabel>
          </HeaderDetailContainer>
        </ModalHeader>
        <ModalContent>
          {orderInfo.orderProducts.map((product, index) => (
            <AppLabel color={Color.BLACK} key={index} size={14}>
              {`${product.productName} x ${product.quantity} | ${product.productPrice.toLocaleString()}원`}
            </AppLabel>
          ))}
          <AppLabel color={Color.BLACK} size={15} style={{ fontWeight: 700 }}>{`상품합계: ${orderInfo.totalPrice.toLocaleString()}원`}</AppLabel>
        </ModalContent>
        <ModalFooter>
          <CloseButton onClick={onClose}>닫기</CloseButton>
        </ModalFooter>
      </ModalContainer>
    </>
  );
}

export default OrderDetailModal;
