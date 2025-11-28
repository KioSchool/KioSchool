import styled from '@emotion/styled';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { Color } from '@resources/colors';
import { Order, OrderStatus } from '@@types/index';
import { format } from 'date-fns';

const Container = styled.div`
  width: 100%;
  padding: 15px 20px;
  background: ${Color.WHITE};
  border-bottom: 1px solid #e8eef2;
  box-sizing: border-box;
  ${rowFlex({ justify: 'space-between', align: 'flex-end' })}
`;

const InfoContainer = styled.div`
  gap: 6px;
  ${colFlex({ align: 'flex-start' })}
`;

const OrderNumber = styled.span`
  font-size: 16px;
  font-weight: 700;
  color: #464a4d;
`;

const ProductSummary = styled.span`
  font-size: 12px;
  font-weight: 700;
  color: #464a4d;
`;

const MetaRow = styled.div`
  gap: 6px;
  ${rowFlex({ align: 'flex-start' })}
`;

const StatusBadge = styled.div`
  width: 71px;
  height: 24px;
  background: ${Color.WHITE};
  border: 1px solid #e8eef2;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 400;
  color: #464a4d;
  text-align: center;
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

const Label = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: #464a4d;
`;

const getStatusLabel = (status: OrderStatus) => {
  switch (status) {
    case OrderStatus.PAID:
      return '결제완료';
    case OrderStatus.SERVED:
      return '서빙완료';
    case OrderStatus.NOT_PAID:
      return '미결제';
    case OrderStatus.CANCELLED:
      return '취소됨';
    default:
      return '결제완료';
  }
};

const getProductSummary = (products: Order['orderProducts']) => {
  if (products.length === 0) return '';
  if (products.length === 1) return products[0].productName;
  return `${products[0].productName} 외 ${products.length - 1}건`;
};

function OrderSessionDetailCard(props: Order) {
  const createdDate = new Date(props.createdAt);
  const productSummary = getProductSummary(props.orderProducts);
  const statusLabel = getStatusLabel(props.status);

  return (
    <Container>
      <InfoContainer>
        <OrderNumber>주문번호 {props.orderNumber}</OrderNumber>
        <ProductSummary>{productSummary}</ProductSummary>
        <MetaRow>
          <Label>{format(createdDate, 'yyyy.MM.dd HH:mm')}</Label>
          <Label>·</Label>
          <Label>{props.customerName}</Label>
          <Label>·</Label>
          <Label>{props.totalPrice.toLocaleString()}원</Label>
        </MetaRow>
      </InfoContainer>
      <StatusBadge>{statusLabel}</StatusBadge>
    </Container>
  );
}

export default OrderSessionDetailCard;
