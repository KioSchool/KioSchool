import { Order } from '@@types/index';
import ToggleOrderCard from './ToggleOrderCard';
import { colFlex } from '@styles/flexStyles';
import styled from '@emotion/styled';
import { Color } from '@resources/colors';

const FallbackContainer = styled.div`
  width: 100%;
  height: 500px;
  ${colFlex({ justify: 'center', align: 'center' })};
  font-size: 20px;
  color: ${Color.GREY};
  font-weight: 600;
`;

const Container = styled.div`
  width: 100%;
  gap: 25px;
  ${colFlex({ align: 'center' })};
`;

const OrderCardContainer = styled.div`
  width: 100%;
  height: 500px;
  gap: 10px;
  overflow: auto;
  ${colFlex()}
`;

interface TotalOrderProps {
  orders: Order[];
}

function TotalOrder({ orders }: TotalOrderProps) {
  if (!orders || orders.length === 0) {
    return <FallbackContainer>주문 내역이 없습니다.</FallbackContainer>;
  }

  return (
    <Container>
      <OrderCardContainer>
        {orders.map((order) => (
          <ToggleOrderCard key={order.id} order={order} />
        ))}
      </OrderCardContainer>
    </Container>
  );
}

export default TotalOrder;
