import styled from '@emotion/styled';
import OrderCardList from './OrderCardList';
import { OrderStatus } from '@@types/index';
import { colFlex } from '@styles/flexStyles';
import AppLabel from '@components/common/label/AppLabel';
import { Color } from '@resources/colors';
import { orderStatusConverter } from '@utils/OrderStatusConverter';

const OrderStatusListContainer = styled.div`
  ${colFlex({ align: 'start' })}
  gap: 10px;
  width: 100%;
  overflow-x: auto;
`;

interface OrderStatusListProps {
  orderStatus: OrderStatus;
}

function OrderStatusList({ orderStatus }: OrderStatusListProps) {
  return (
    <>
      <AppLabel color={Color.BLACK} size={22} style={{ fontWeight: 700 }}>
        {orderStatusConverter(orderStatus)}
      </AppLabel>
      <OrderStatusListContainer>
        <OrderCardList orderStatus={orderStatus} />
      </OrderStatusListContainer>
    </>
  );
}

export default OrderStatusList;
