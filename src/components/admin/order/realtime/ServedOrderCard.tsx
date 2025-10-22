import { memo } from 'react';
import { Order } from '@@types/index';
import AppLabel from '@components/common/label/AppLabel';
import OrderDetailModal from '@components/admin/order/realtime/modal/order-detail/OrderDetailModal';
import { areOrdersEquivalent } from '@utils/MemoCompareFunction';
import useModal from '@hooks/useModal';
import { CardContainer, OrderInfoContainer, DescriptionContainer } from '@styles/orderCardStyles';

const arePropsEqual = (prevProps: OrderCardProps, nextProps: OrderCardProps) => {
  return areOrdersEquivalent(prevProps.order, nextProps.order);
};

interface OrderCardProps {
  order: Order;
}

function ServedOrderCard({ order }: OrderCardProps) {
  const { isModalOpen, openModal, closeModal } = useModal();

  const orderInfoClickHandler = () => {
    openModal();
  };

  return (
    <CardContainer height={48}>
      <OrderInfoContainer onClick={orderInfoClickHandler}>
        <AppLabel size={16} style={{ fontWeight: 800, color: '#464A4D' }}>
          {order.customerName}
        </AppLabel>
        <DescriptionContainer>
          <AppLabel size={12} style={{ fontWeight: 800, color: '#464A4D' }}>{`주문번호 ${order.orderNumber}`}</AppLabel>
          <AppLabel size={12} style={{ fontWeight: 800, color: '#464A4D' }}>{`총 ${order.totalPrice.toLocaleString()}원`}</AppLabel>
        </DescriptionContainer>
      </OrderInfoContainer>
      <OrderDetailModal order={order} isModalOpen={isModalOpen} closeModal={closeModal} />
    </CardContainer>
  );
}

export default memo(ServedOrderCard, arePropsEqual);
