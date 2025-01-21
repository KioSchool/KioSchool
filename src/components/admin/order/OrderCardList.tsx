import { Order } from '@@types/index';
import OrderCard from './OrderCard';
import styled from '@emotion/styled';
import { rowFlex } from '@styles/flexStyles';

const CardListContainer = styled.div`
  ${rowFlex()}
  gap: 10px;
  height: 180px;
`;

interface OrderCardListProps {
  filteredOrders: Order[];
}

function OrderCardList({ filteredOrders }: OrderCardListProps) {
  return (
    <CardListContainer>
      {filteredOrders.map((order) => {
        return <OrderCard key={order.id} orderInfo={order} />;
      })}
    </CardListContainer>
  );
}

export default OrderCardList;
