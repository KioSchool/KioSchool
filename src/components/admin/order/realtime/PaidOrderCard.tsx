import { memo } from 'react';
import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { Order } from '@@types/index';
import { GA_EVENT, ORDER_EVENT_LOCATION } from '@constants/analytics';
import { trackEvent } from '@utils/analytics';
import OrderDetailModal from '@components/admin/order/realtime/modal/order-detail/OrderDetailModal';
import OrderItemList from './OrderItemList';
import { areOrdersEquivalent } from '@utils/memoCompareFunction';
import useModal from '@hooks/useModal';
import { extractMinFromDate } from '@utils/formatDate';
import useFormattedTime from '@hooks/useFormattedTime';
import { Color } from '@resources/colors';
import { CardContainer, CardText, DescriptionContainer, HeaderContainer, HorizontalLine, OrderInfoContainer } from '@styles/orderCardStyles';
import { ELAPSED_LEVEL_COLOR, ElapsedLevel, getElapsedLevel } from '@utils/orderElapsed';

const ElapsedText = styled(CardText)<{ level: ElapsedLevel }>`
  color: ${({ level }) => ELAPSED_LEVEL_COLOR[level]};
`;

const CustomerName = styled.div`
  width: 100%;
  font-size: 12px;
  color: ${Color.MUTED_GREY};
`;

const arePropsEqual = (prevProps: OrderCardProps, nextProps: OrderCardProps) => {
  return areOrdersEquivalent(prevProps.order, nextProps.order);
};

interface OrderCardProps {
  order: Order;
}

function PaidOrderCard({ order }: OrderCardProps) {
  const delayMinutes = useFormattedTime<number>({ date: order.createdAt, formatter: extractMinFromDate }) ?? 0;
  const level = getElapsedLevel(delayMinutes);
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { isModalOpen, openModal, closeModal } = useModal();

  const orderInfoClickHandler = () => {
    openModal();
    trackEvent(GA_EVENT.ORDER_CARD_OPEN, { workspace_id: workspaceId, location: ORDER_EVENT_LOCATION.PAID_CARD });
  };

  return (
    <CardContainer height={234}>
      <OrderInfoContainer onClick={orderInfoClickHandler}>
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
      <OrderDetailModal order={order} isModalOpen={isModalOpen} closeModal={closeModal} />
    </CardContainer>
  );
}

export default memo(PaidOrderCard, arePropsEqual);
