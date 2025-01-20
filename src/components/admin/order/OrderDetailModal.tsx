import { Order, OrderStatus } from '@@types/index';
import RoundedAppButton from '@components/common/button/RoundedAppButton';
import AppLabel from '@components/common/label/AppLabel';
import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import CloseSvg from '@resources/svg/CloseSvg';
import { expandButtonStyle } from '@styles/buttonStyles';
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

const HorizontalLine = styled.hr`
  width: 100%;
  border: 0.3px solid #eeecec;
`;

const ModalHeader = styled.div`
  ${colFlex({ justify: 'space-between', align: 'start' })}
  gap: 10px;
  padding-bottom: 10px;
  border-bottom: 20px solid ${Color.LIGHT_GREY};
`;

const ModalHeaderTitle = styled.div`
  ${rowFlex({ justify: 'space-between', align: 'center' })}
  width: 100%;
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

const OrderProductContainer = styled.div`
  ${colFlex({ justify: 'start' })}
  width: 100%;
  height: 300px;
  gap: 15px;
  overflow-y: auto;
`;

const ProductContainer = styled.div`
  ${rowFlex({ justify: 'space-between', align: 'center' })}
  width: 100%;

  &:hover {
    & * {
      color: ${Color.KIO_ORANGE};
    }
  }
`;

const TotalLabelContainer = styled.div`
  ${rowFlex({ justify: 'space-between', align: 'center' })}
  width: 100%;
`;

const ModalFooter = styled.div`
  ${rowFlex({ justify: 'space-between', align: 'center' })}
  padding-top: 15px;
  width: 100%;
`;

const CloseIcon = styled(CloseSvg)`
  ${expandButtonStyle}
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
          <ModalHeaderTitle>
            <AppLabel color={Color.BLACK} size={17} style={{ fontWeight: 800 }}>{`테이블 ${orderInfo.tableNumber + 1}`}</AppLabel>
            <CloseIcon onClick={onClose} />
          </ModalHeaderTitle>
          <HeaderDetailContainer>
            <HeaderDetail>
              <AppLabel color={Color.BLACK} size={13}>{`주문 번호  ${orderInfo.id + 1}`}</AppLabel>
              <AppLabel color={Color.BLACK} size={13}>{`주문 일시 | ${new Date(orderInfo.createdAt).toLocaleString()}`}</AppLabel>
            </HeaderDetail>
            <AppLabel color={Color.KIO_ORANGE} size={17} style={{ fontWeight: 600 }}>
              {orderStatusMap[orderInfo.status]}
            </AppLabel>
          </HeaderDetailContainer>
        </ModalHeader>
        <ModalContent>
          <AppLabel color={Color.BLACK} size={20} style={{ fontWeight: 700 }}>
            주문 내역
          </AppLabel>
          <HorizontalLine />
          <OrderProductContainer>
            {orderInfo.orderProducts.map((product, index) => (
              <ProductContainer>
                <AppLabel color={Color.BLACK} key={index} size={20}>
                  {`${product.productName} x ${product.quantity}`}
                </AppLabel>
                <AppLabel color={Color.BLACK} key={index} size={20}>
                  {`${product.productPrice.toLocaleString()}원`}
                </AppLabel>
              </ProductContainer>
            ))}
          </OrderProductContainer>
          <HorizontalLine />
          <TotalLabelContainer>
            <AppLabel color={Color.BLACK} size={20} style={{ fontWeight: 700 }}>
              {'상품 합계'}
            </AppLabel>
            <AppLabel color={Color.BLACK} size={20} style={{ fontWeight: 700 }}>{`${orderInfo.totalPrice.toLocaleString()}원`}</AppLabel>
          </TotalLabelContainer>
        </ModalContent>
        <ModalFooter>
          <RoundedAppButton>주문 취소</RoundedAppButton>
          <RoundedAppButton>주문 확인</RoundedAppButton>
        </ModalFooter>
      </ModalContainer>
    </>
  );
}

export default OrderDetailModal;
