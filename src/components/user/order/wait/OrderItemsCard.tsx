import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { rowFlex } from '@styles/flexStyles';
import { OrderProduct } from '@@types/index';
import { OrderCard, OrderCardDivider, OrderCardTitle, OrderItemName, OrderItemQuantity } from '@components/user/order/orderCardStyles';

const Card = styled(OrderCard)`
  padding: 18px 20px;
  gap: 10px;
`;

const Row = styled.div`
  ${rowFlex({ justify: 'space-between', align: 'center' })}
`;

const Text = styled.span`
  color: ${Color.TEXT_DEFAULT};
  font-size: 14px;
`;

const TotalLabel = styled.span`
  color: ${Color.TEXT_STRONG};
  font-size: 14px;
  font-weight: 700;
`;

const TotalValue = styled.span`
  color: ${Color.TEXT_STRONG};
  font-size: 15px;
  font-weight: 700;
`;

interface OrderItemsCardProps {
  orderProducts: OrderProduct[];
  totalPrice: number;
}

function OrderItemsCard({ orderProducts, totalPrice }: OrderItemsCardProps) {
  if (orderProducts.length === 0) return null;

  return (
    <Card>
      <OrderCardTitle>주문 내역</OrderCardTitle>
      {orderProducts.map((product) => (
        <Row key={product.id}>
          <OrderItemName>
            {product.productName}
            <OrderItemQuantity>{product.quantity}개</OrderItemQuantity>
          </OrderItemName>
          <Text>{product.totalPrice.toLocaleString()}원</Text>
        </Row>
      ))}
      <OrderCardDivider />
      <Row>
        <TotalLabel>합계</TotalLabel>
        <TotalValue>{totalPrice.toLocaleString()}원</TotalValue>
      </Row>
    </Card>
  );
}

export default OrderItemsCard;
