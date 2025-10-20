import { memo } from 'react';
import { Order } from '@@types/index';
import AppLabel from '@components/common/label/AppLabel';
import useAdminOrder from '@hooks/admin/useAdminOrder';
import { useParams } from 'react-router-dom';
import OrderDetailModal from '@components/admin/order/realtime/modal/order-detail/OrderDetailModal';
import { areOrdersEquivalent } from '@utils/MemoCompareFunction';
import useFormattedTime from '@hooks/useFormattedTime';
import useModal from '@hooks/useModal';
import { extractMinFromDate } from '@utils/FormatDate';
import { CardContainer, OrderInfoContainer, DescriptionContainer, CheckButtonContainer, CheckIcon } from '@styles/orderCardStyles';

interface OrderCardProps {
  order: Order;
}

const arePropsEqual = (prevProps: OrderCardProps, nextProps: OrderCardProps) => {
  return areOrdersEquivalent(prevProps.order, nextProps.order);
};

function NotPaidOrderCard({ order }: OrderCardProps) {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { payOrder } = useAdminOrder(workspaceId);
  const delayMinutes = useFormattedTime<number>({ date: order.createdAt, formatter: extractMinFromDate });
  const { isModalOpen, openModal, closeModal } = useModal();

  const checkClickHandler = () => {
    payOrder(order.id);
  };

  const orderInfoClickHandler = () => {
    openModal();
  };

  return (
    <CardContainer height={84} onClick={openModal}>
      <OrderInfoContainer onClick={orderInfoClickHandler}>
        <AppLabel size={16} style={{ fontWeight: 800, color: '#464A4D' }}>
          {order.customerName}
        </AppLabel>
        <DescriptionContainer>
          <AppLabel size={12} style={{ fontWeight: 800, color: '#464A4D' }}>{`${delayMinutes}분 전`}</AppLabel>
          <AppLabel size={12} style={{ fontWeight: 800, color: '#464A4D' }}>{`총 ${order.totalPrice.toLocaleString()}원`}</AppLabel>
        </DescriptionContainer>
      </OrderInfoContainer>
      <OrderDetailModal order={order} isModalOpen={isModalOpen} closeModal={closeModal} />
      <CheckButtonContainer>
        <CheckIcon onClick={checkClickHandler} />
      </CheckButtonContainer>
    </CardContainer>
  );
}

export default memo(NotPaidOrderCard, arePropsEqual);
