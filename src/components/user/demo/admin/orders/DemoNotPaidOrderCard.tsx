import styled from '@emotion/styled';
import { useSetAtom } from 'jotai';
import { Order } from '@@types/index';
import useFormattedTime from '@hooks/useFormattedTime';
import useDemoPayUndoToast from '@hooks/user/useDemoPayUndoToast';
import { demoStateAtom } from '@jotai/user/demoAtoms';
import { CardContainer, CardFooter, CardText, CheckIcon, DescriptionContainer, OrderInfoContainer, TableNumberBadge } from '@styles/orderCardStyles';
import { extractMinFromDate } from '@utils/formatDate';

const CheckButton = styled.button`
  padding: 0;
  border: 0;
  background: none;
  line-height: 0;
  cursor: pointer;
`;

interface DemoNotPaidOrderCardProps {
  order: Order;
}

function DemoNotPaidOrderCard({ order }: DemoNotPaidOrderCardProps) {
  const dispatch = useSetAtom(demoStateAtom);
  const confirmPayment = useDemoPayUndoToast();
  const delayMinutes = useFormattedTime<number>({ date: order.createdAt, formatter: extractMinFromDate });

  return (
    <CardContainer height={84} data-demo-order={order.id}>
      <OrderInfoContainer onClick={() => dispatch({ type: 'ORDER_OPEN', orderId: order.id })}>
        <CardText size={16} weight={800}>
          {order.customerName}
        </CardText>
        <DescriptionContainer>
          <CardText size={12} weight={800}>{`${delayMinutes}분 전`}</CardText>
          <CardText size={12} weight={800}>{`총 ${order.totalPrice.toLocaleString()}원`}</CardText>
        </DescriptionContainer>
      </OrderInfoContainer>
      <CardFooter>
        <TableNumberBadge>{`테이블 ${order.tableNumber}`}</TableNumberBadge>
        <CheckButton type="button" aria-label="결제 확인" data-demo-focus={`order-check-${order.id}`} onClick={() => confirmPayment(order)}>
          <CheckIcon />
        </CheckButton>
      </CardFooter>
    </CardContainer>
  );
}

export default DemoNotPaidOrderCard;
