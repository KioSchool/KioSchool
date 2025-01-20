import styled from '@emotion/styled';
import OrderCardList from './OrderCardList';
import { OrderStatus } from '@@types/index';
import { colFlex } from '@styles/flexStyles';
import AppLabel from '@components/common/label/AppLabel';

const OrderStatusListContainer = styled.div`
  ${colFlex({ align: 'start' })}
  gap: 10px;
  width: 100%;
  overflow-x: auto;
`;

interface OrderStatusListProps {
  title: string;
  orderStatus: OrderStatus;
}

function OrderStatusList({ title, orderStatus }: OrderStatusListProps) {
  return (
    <>
      <AppLabel size={22} style={{ fontWeight: 700 }}>
        {title}
      </AppLabel>
      <OrderStatusListContainer>
        <OrderCardList orderStatus={orderStatus} />
      </OrderStatusListContainer>
    </>
  );
}

export default OrderStatusList;
