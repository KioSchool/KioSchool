import styled from '@emotion/styled';
import { Order } from '@@types/index';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { getDisplayedQuantity } from '@utils/orderProduct';
import { Color } from '@resources/colors';

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

const ItemText = styled.div<{ $isServed: boolean }>`
  height: 24px;
  font-size: 12px;
  font-weight: 400;
  color: ${({ $isServed }) => ($isServed ? Color.DISABLED_GREY : Color.TEXT_DEFAULT)};
  text-decoration: ${({ $isServed }) => ($isServed ? 'line-through' : 'none')};
`;

const QuantityText = styled(ItemText)`
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
          <ItemText $isServed={orderProduct.isServed}>{orderProduct.productName}</ItemText>
          <QuantityText $isServed={orderProduct.isServed}>{getDisplayedQuantity(orderProduct)}</QuantityText>
        </ItemContainer>
      ))}
    </ListContainer>
  );
}

export default OrderItemList;
