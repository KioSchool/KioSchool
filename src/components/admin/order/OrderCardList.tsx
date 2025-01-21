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
  orders: Order[];
}

function OrderCardList({ orders }: OrderCardListProps) {
  return (
    <CardListContainer>
      {orders.map((order) => {
        return <OrderCard key={order.id} order={order} />;
      })}
    </CardListContainer>
  );
}

export default OrderCardList;
