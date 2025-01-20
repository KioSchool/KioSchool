import styled from '@emotion/styled';
import OrderCardList from './OrderCardList';
import { OrderStatus } from '@@types/index';

const StatusTitle = styled.div`
  font-size: '30px';
`;

interface OrderStatusListProps {
  title: string;
  orderStatus: OrderStatus;
}

function OrderStatusList({ title, orderStatus }: OrderStatusListProps) {
  return (
    <>
      <StatusTitle>{title}</StatusTitle>
      <OrderCardList orderStatus={orderStatus} />
    </>
  );
}

export default OrderStatusList;
