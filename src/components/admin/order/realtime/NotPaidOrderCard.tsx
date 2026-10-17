import { memo } from 'react';
import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { Order } from '@@types/index';
import { Color } from '@resources/colors';
import OrderDetailModal from '@components/admin/order/realtime/modal/order-detail/OrderDetailModal';
import NewCommonButton from '@components/common/button/NewCommonButton';
import { areOrdersEquivalent } from '@utils/memoCompareFunction';
import useFormattedTime from '@hooks/useFormattedTime';
import useModal from '@hooks/useModal';
import usePayOrderWithUndo from '@hooks/admin/usePayOrderWithUndo';
import { extractMinFromDate } from '@utils/formatDate';
import { PlainCardContainer, OrderInfoContainer, DescriptionContainer, CardText } from '@styles/orderCardStyles';

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

const PayButton = styled(NewCommonButton)`
  flex-shrink: 0;
  width: 100%;
  margin-top: 6px;
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
  };

  return (
    <PlainCardContainer height={112}>
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
      <PayButton size="sm" onClick={handlePayClick}>
        결제 확인
      </PayButton>
      <OrderDetailModal order={order} isModalOpen={isModalOpen} closeModal={closeModal} />
    </PlainCardContainer>
  );
}

export default memo(NotPaidOrderCard, arePropsEqual);
