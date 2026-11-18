import { useSetAtom } from 'jotai';
import { Order } from '@@types/index';
import { demoStateAtom } from '@jotai/user/demoAtoms';
import { CardContainer, CardText, DescriptionContainer, OrderInfoContainer } from '@styles/orderCardStyles';

interface DemoServedOrderCardProps {
  order: Order;
}

function DemoServedOrderCard({ order }: DemoServedOrderCardProps) {
  const dispatch = useSetAtom(demoStateAtom);

  return (
    <CardContainer height={48} data-demo-order={order.id}>
      <OrderInfoContainer onClick={() => dispatch({ type: 'ORDER_OPEN', orderId: order.id })}>
        <CardText size={16} weight={800}>
          {`${order.tableNumber}번 테이블`}
        </CardText>
        <DescriptionContainer>
          <CardText size={12} weight={800}>{`주문번호 ${order.orderNumber}`}</CardText>
          <CardText size={12} weight={800}>{`총 ${order.totalPrice.toLocaleString()}원`}</CardText>
        </DescriptionContainer>
      </OrderInfoContainer>
    </CardContainer>
  );
}

export default DemoServedOrderCard;
