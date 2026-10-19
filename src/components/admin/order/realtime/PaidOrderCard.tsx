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
import { rowFlex } from '@styles/flexStyles';
import { CardContainer, CardText, DescriptionContainer, HeaderContainer, HorizontalLine, OrderInfoContainer } from '@styles/orderCardStyles';
import ProgressRing from '@components/admin/order/table-manage/common/ProgressRing';
import { ELAPSED_LEVEL, ELAPSED_LEVEL_COLOR, ElapsedLevel, getElapsedLevel, getElapsedRingPercent } from '@utils/orderElapsed';

// 공용 hover 반전은 background-color만 덮어서 conic-gradient 링이 깨진다. 다른 글자처럼 흰 테로 바꾼다
const PaidCardContainer = styled(CardContainer)`
  &:hover [data-role='elapsed-time'] > div {
    background: ${Color.WHITE};
  }
`;

const ElapsedTime = styled.span`
  gap: 6px;
  ${rowFlex({ align: 'center' })}
`;

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
    <PaidCardContainer height={234}>
      <OrderInfoContainer onClick={orderInfoClickHandler}>
        <HeaderContainer>
          <CardText size={16} weight={800} height={24}>
            {`${order.tableNumber}번 테이블`}
          </CardText>
          <DescriptionContainer>
            <ElapsedTime data-role="elapsed-time">
              <ProgressRing
                percent={getElapsedRingPercent(delayMinutes)}
                fillColor={level === ELAPSED_LEVEL.DANGER ? Color.RED : Color.KIO_ORANGE}
                holeColor={Color.WHITE}
              />
              <ElapsedText size={12} weight={800} level={level}>{`${delayMinutes}분 전`}</ElapsedText>
            </ElapsedTime>
            <CardText size={12} weight={800}>{`총 ${order.totalPrice.toLocaleString()}원`}</CardText>
          </DescriptionContainer>
        </HeaderContainer>
        <HorizontalLine />
        <OrderItemList order={order} />
        <CustomerName>{order.customerName}</CustomerName>
      </OrderInfoContainer>
      <OrderDetailModal order={order} isModalOpen={isModalOpen} closeModal={closeModal} />
    </PaidCardContainer>
  );
}

export default memo(PaidOrderCard, arePropsEqual);
