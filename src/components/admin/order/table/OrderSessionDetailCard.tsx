import styled from '@emotion/styled';
import { format } from 'date-fns';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { Color } from '@resources/colors';
import { Order, OrderProduct } from '@@types/index';
import { getOrderStatusLabel } from '@utils/orderStatusConverter';
import OrderDetailModal from '@components/admin/order/realtime/modal/order-detail/OrderDetailModal';
import useModal from '@hooks/useModal';

const Container = styled.div``;

const ProductContainer = styled.div`
  width: 100%;
  padding: 15px 20px;
  background: ${Color.WHITE};
  border-bottom: 1px solid ${Color.BORDER_GREY};
  box-sizing: border-box;
  cursor: pointer;
  transition: background-color 0.2s ease;
  ${rowFlex({ justify: 'space-between', align: 'flex-end' })}

  &:hover {
    background-color: #f8f9fa;
  }
`;

const InfoContainer = styled.div`
  gap: 6px;
  ${colFlex({ align: 'flex-start' })}
`;

const OrderNumber = styled.span`
  font-size: 16px;
  font-weight: 700;
  color: ${Color.TEXT_DEFAULT};
`;

const ProductSummary = styled.span`
  font-size: 12px;
  font-weight: 700;
  color: ${Color.TEXT_DEFAULT};
`;

const MetaRow = styled.div`
  gap: 6px;
  ${rowFlex({ align: 'flex-start' })}
`;

const StatusBadge = styled.div`
  width: 71px;
  height: 24px;
  background: ${Color.WHITE};
  border: 1px solid ${Color.BORDER_GREY};
  border-radius: 6px;
  font-size: 12px;
  font-weight: 400;
  color: ${Color.TEXT_DEFAULT};
  text-align: center;
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

const Label = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${Color.TEXT_DEFAULT};
`;

const getProductSummary = (orderProducts: OrderProduct[]) => {
  if (orderProducts.length === 0) return '';
  if (orderProducts.length === 1) return orderProducts[0].productName;
  return `${orderProducts[0].productName} 외 ${orderProducts.length - 1}건`;
};

function OrderSessionDetailCard(order: Order) {
  const { isModalOpen, openModal, closeModal } = useModal();

  const createdDate = new Date(order.createdAt);
  const productSummary = getProductSummary(order.orderProducts);
  const statusLabel = getOrderStatusLabel(order.status);

  return (
    <Container>
      <ProductContainer onClick={openModal}>
        <InfoContainer>
          <OrderNumber>주문번호 {order.orderNumber}</OrderNumber>
          <ProductSummary>{productSummary}</ProductSummary>
          <MetaRow>
            <Label>{format(createdDate, 'yyyy.MM.dd HH:mm')}</Label>
            <Label>·</Label>
            <Label>{order.customerName}</Label>
            <Label>·</Label>
            <Label>{order.totalPrice.toLocaleString()}원</Label>
          </MetaRow>
        </InfoContainer>
        <StatusBadge>{statusLabel}</StatusBadge>
      </ProductContainer>
      <OrderDetailModal order={order} isModalOpen={isModalOpen} closeModal={closeModal} readOnly={true} />
    </Container>
  );
}

export default OrderSessionDetailCard;
