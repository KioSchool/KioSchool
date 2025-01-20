import { Order } from '@@types/index';
import AppLabel from '@components/common/label/AppLabel';
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

interface OrderItemListProps {
  orderInfo: Order;
}

function OrderItemList({ orderInfo }: OrderItemListProps) {
  return (
    <ListContainer>
      {orderInfo.orderProducts.map((product) => (
        <ItemContainer key={product.id}>
          <AppLabel color={Color.BLACK} size={15}>
            {product.productName}
          </AppLabel>
          <AppLabel color={Color.BLACK} size={15}>
            {product.quantity}
          </AppLabel>
        </ItemContainer>
      ))}
    </ListContainer>
  );
}

export default OrderItemList;
