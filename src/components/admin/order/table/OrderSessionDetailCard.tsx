import styled from '@emotion/styled';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { Color } from '@resources/colors';
import { Order } from '@@types/index';
import { format } from 'date-fns';
import { orderStatusConverter } from '@utils/orderStatusConverter';

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

const getProductSummary = (products: Order['orderProducts']) => {
  if (products.length === 0) return '';
  if (products.length === 1) return products[0].productName;
  return `${products[0].productName} 외 ${products.length - 1}건`;
};

function OrderSessionDetailCard(order: Order) {
  const createdDate = new Date(order.createdAt);
  const productSummary = getProductSummary(order.orderProducts);
  const statusLabel = orderStatusConverter(order.status);

  return (
    <Container>
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
    </Container>
  );
}

export default OrderSessionDetailCard;
