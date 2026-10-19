import { memo } from 'react';
import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { Order } from '@@types/index';
import { GA_EVENT, ORDER_EVENT_LOCATION } from '@constants/analytics';
import { trackEvent } from '@utils/analytics';
import { Color } from '@resources/colors';
import OrderDetailModal from '@components/admin/order/realtime/modal/order-detail/OrderDetailModal';
import { areOrdersEquivalent } from '@utils/memoCompareFunction';
import useFormattedTime from '@hooks/useFormattedTime';
import useModal from '@hooks/useModal';
import usePayOrderWithUndo from '@hooks/admin/usePayOrderWithUndo';
import { extractMinFromDate } from '@utils/formatDate';
import { rowFlex } from '@styles/flexStyles';
import { PlainCardContainer, OrderInfoContainer, DescriptionContainer, CardText, CheckIcon } from '@styles/orderCardStyles';

const CUSTOMER_NAME_MAX_WIDTH_PX = 96;

const TitleRow = styled(DescriptionContainer)`
  gap: 8px;
`;

const CustomerName = styled(CardText)`
  display: block;
  min-width: 0;
  max-width: ${CUSTOMER_NAME_MAX_WIDTH_PX}px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Price = styled(CardText)`
  flex-shrink: 0;
`;

const MutedText = styled(CardText)`
  color: ${Color.MUTED_GREY};
`;

const PayButton = styled.button`
  flex-shrink: 0;
  align-self: flex-end;
  height: 24px;
  gap: 4px;
  padding: 0;
  border: none;
  background-color: transparent;
  color: ${Color.GREY};
  font-size: 12px;
  font-weight: 800;
  cursor: pointer;
  ${rowFlex({ align: 'center' })}
`;

interface OrderCardProps {
  order: Order;
}

const arePropsEqual = (prevProps: OrderCardProps, nextProps: OrderCardProps) => {
  return areOrdersEquivalent(prevProps.order, nextProps.order);
};

function NotPaidOrderCard({ order }: OrderCardProps) {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { confirmPayment } = usePayOrderWithUndo(workspaceId);
  const delayMinutes = useFormattedTime<number>({ date: order.createdAt, formatter: extractMinFromDate });
  const { isModalOpen, openModal, closeModal } = useModal();

  const handlePayClick = () => {
    confirmPayment(order);
  };

  const orderInfoClickHandler = () => {
    openModal();
    trackEvent(GA_EVENT.ORDER_CARD_OPEN, { workspace_id: workspaceId, location: ORDER_EVENT_LOCATION.NOT_PAID_CARD });
  };

  return (
    <PlainCardContainer height={84}>
      <OrderInfoContainer onClick={orderInfoClickHandler}>
        <TitleRow>
          <CustomerName size={16} weight={800}>
            {order.customerName}
          </CustomerName>
          <Price size={16} weight={800}>{`${order.totalPrice.toLocaleString()}원`}</Price>
        </TitleRow>
        <DescriptionContainer>
          <MutedText size={12} weight={800}>{`${order.tableNumber}번 테이블`}</MutedText>
          <MutedText size={12} weight={800}>{`${delayMinutes}분 전`}</MutedText>
        </DescriptionContainer>
      </OrderInfoContainer>
      <PayButton type="button" onClick={handlePayClick}>
        <CheckIcon />
        결제 확인
      </PayButton>
      <OrderDetailModal order={order} isModalOpen={isModalOpen} closeModal={closeModal} />
    </PlainCardContainer>
  );
}

export default memo(NotPaidOrderCard, arePropsEqual);
