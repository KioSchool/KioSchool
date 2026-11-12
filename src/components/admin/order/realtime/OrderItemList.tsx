import { Order } from '@@types/index';
import styled from '@emotion/styled';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { getDisplayedQuantity } from '@utils/orderProduct';

const ListContainer = styled.div`
  width: 100%;
  flex-grow: 1;
  padding: 6px 0;
  overflow-y: auto;
  ${colFlex()}
`;

const ItemContainer = styled.div`
  width: 100%;
  ${rowFlex({ justify: 'space-between', align: 'start' })}
`;

const StyledText = styled.div<{ $isServed: boolean }>`
  height: 24px;
  font-size: 12px;
  font-weight: 400;
  color: ${({ $isServed }) => ($isServed ? '#D1D5D8' : '#464A4D')};
  text-decoration: ${({ $isServed }) => ($isServed ? 'line-through' : 'none')};
`;

const QuantityText = styled(StyledText)`
  font-weight: 800;
`;

interface OrderItemListProps {
  order: Order;
}

function OrderItemList({ order }: OrderItemListProps) {
  return (
    <ListContainer>
      {order.orderProducts.map((orderProduct) => (
        <ItemContainer key={orderProduct.id}>
          <StyledText $isServed={orderProduct.isServed}>{orderProduct.productName}</StyledText>
          <QuantityText $isServed={orderProduct.isServed}>{getDisplayedQuantity(orderProduct)}</QuantityText>
        </ItemContainer>
      ))}
    </ListContainer>
  );
}

export default OrderItemList;
