import { memo } from 'react';
import { Order } from '@@types/index';
import AppLabel from '@components/common/label/AppLabel';
import OrderDetailModal from '@components/admin/order/realtime/modal/order-detail/OrderDetailModal';
import OrderItemList from '@components/admin/order/realtime/OrderItemList';
import { areOrdersEquivalent } from '@utils/MemoCompareFunction';
import useModal from '@hooks/useModal';
import { extractMinFromDate } from '@utils/FormatDate';
import useFormattedTime from '@hooks/useFormattedTime';
import { CardContainer, CheckButtonContainer, CheckIcon, DescriptionContainer, OrderInfoContainer } from '@styles/orderCardStyles';
import useAdminOrder from '@hooks/admin/useAdminOrder';
import { useParams } from 'react-router-dom';

const arePropsEqual = (prevProps: OrderCardProps, nextProps: OrderCardProps) => {
  return areOrdersEquivalent(prevProps.order, nextProps.order);
};

interface OrderCardProps {
  order: Order;
}

function PaidOrderCard({ order }: OrderCardProps) {
  const delayMinutes = useFormattedTime<number>({ date: order.createdAt, formatter: extractMinFromDate });
  const { isModalOpen, openModal, closeModal } = useModal();

  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { serveOrder } = useAdminOrder(workspaceId);

  const orderInfoClickHandler = () => {
    openModal();
  };

  const handleServeOrderClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    serveOrder(order.id);
  };

  return (
    <CardContainer height={234}>
      <OrderInfoContainer onClick={orderInfoClickHandler}>
        <AppLabel size={16} style={{ fontWeight: 800, color: '#464A4D' }}>
          {order.customerName}
        </AppLabel>
        <DescriptionContainer>
          <AppLabel size={12} style={{ fontWeight: 800, color: '#464A4D' }}>{`${delayMinutes}분 전`}</AppLabel>
          <AppLabel size={12} style={{ fontWeight: 800, color: '#464A4D' }}>{`총 ${order.totalPrice.toLocaleString()}원`}</AppLabel>
        </DescriptionContainer>
      </OrderInfoContainer>
      <OrderItemList order={order} />
      <CheckButtonContainer>
        <CheckIcon onClick={handleServeOrderClick} />
      </CheckButtonContainer>
      <OrderDetailModal order={order} isModalOpen={isModalOpen} closeModal={closeModal} />
    </CardContainer>
  );
}

export default memo(PaidOrderCard, arePropsEqual);
