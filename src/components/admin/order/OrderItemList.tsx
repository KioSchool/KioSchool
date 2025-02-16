import { Order } from '@@types/index';
import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';

const ListContainer = styled.div`
  ${colFlex()}
  width: 100%;
  height: 53px;
  overflow-y: auto;
`;

const ItemContainer = styled.div`
  ${rowFlex({ justify: 'space-between', align: 'center' })}
  width: 100%;
`;

const StyledText = styled.div<{ $isServed: boolean }>`
  font-size: 15px;
  color: ${({ $isServed }) => ($isServed ? Color.GREY : Color.BLACK)};
  text-decoration: ${({ $isServed }) => ($isServed ? 'line-through' : 'none')};
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
          <StyledText $isServed={orderProduct.isServed}>{orderProduct.quantity}</StyledText>
        </ItemContainer>
      ))}
    </ListContainer>
  );
}

export default OrderItemList;
