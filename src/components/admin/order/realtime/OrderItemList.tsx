import { Order } from '@@types/index';
import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';

const ListContainer = styled.div`
  ${colFlex()}
  width: 100%;
  height: 100%;
  padding: 10px 0;
  overflow-y: auto;
`;

const ItemContainer = styled.div`
  ${rowFlex({ justify: 'space-between', align: 'start' })}
  width: 100%;
`;

const StyledText = styled.div<{ $isServed: boolean }>`
  height: 24px;
  font-family: 'LINE Seed Sans KR', sans-serif;
  font-size: 12px;
  font-weight: 400;
  color: ${({ $isServed }) => ($isServed ? Color.GREY : '#464A4D')};
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
