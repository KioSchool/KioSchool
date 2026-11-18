import styled from '@emotion/styled';
import { useSetAtom } from 'jotai';
import { Order } from '@@types/index';
import OrderItemList from '@components/admin/order/realtime/OrderItemList';
import useFormattedTime from '@hooks/useFormattedTime';
import { demoStateAtom } from '@jotai/user/demoAtoms';
import { Color } from '@resources/colors';
import { CardContainer, CardText, DescriptionContainer, HeaderContainer, HorizontalLine, OrderInfoContainer } from '@styles/orderCardStyles';
import { extractMinFromDate } from '@utils/formatDate';
import { ELAPSED_LEVEL_COLOR, ElapsedLevel, getElapsedLevel } from '@utils/orderElapsed';

const ElapsedText = styled(CardText)<{ level: ElapsedLevel }>`
  color: ${({ level }) => ELAPSED_LEVEL_COLOR[level]};
`;

const CustomerName = styled.div`
  width: 100%;
  font-size: 12px;
  color: ${Color.MUTED_GREY};
`;

interface DemoPaidOrderCardProps {
  order: Order;
}

function DemoPaidOrderCard({ order }: DemoPaidOrderCardProps) {
  const dispatch = useSetAtom(demoStateAtom);
  const delayMinutes = useFormattedTime<number>({ date: order.createdAt, formatter: extractMinFromDate }) ?? 0;
  const level = getElapsedLevel(delayMinutes);

  return (
    <CardContainer height={234} data-demo-order={order.id} data-demo-focus={`order-paid-${order.id}`}>
      <OrderInfoContainer onClick={() => dispatch({ type: 'ORDER_OPEN', orderId: order.id })}>
        <HeaderContainer>
          <CardText size={16} weight={800} height={24}>
            {`${order.tableNumber}번 테이블`}
          </CardText>
          <DescriptionContainer>
            <ElapsedText size={12} weight={800} level={level}>{`${delayMinutes}분 전`}</ElapsedText>
            <CardText size={12} weight={800}>{`총 ${order.totalPrice.toLocaleString()}원`}</CardText>
          </DescriptionContainer>
        </HeaderContainer>
        <HorizontalLine />
        <OrderItemList order={order} />
        <CustomerName>{order.customerName}</CustomerName>
      </OrderInfoContainer>
    </CardContainer>
  );
}

export default DemoPaidOrderCard;
