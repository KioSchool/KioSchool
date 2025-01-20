import { Order } from '@@types/index';
import styled from '@emotion/styled';
import OrderCardList from './OrderCardList';

const StatusTitle = styled.div`
  font-size: '30px';
`;

interface OrderStatusListProps {
  title: string;
  items: Order;
}

function OrderStatusList({ title }: OrderStatusListProps) {
  return (
    <>
      <StatusTitle>{title}</StatusTitle>
      <OrderCardList />
    </>
  );
}

export default OrderStatusList;
