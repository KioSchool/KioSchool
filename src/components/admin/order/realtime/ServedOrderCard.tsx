import { memo } from 'react';
import { Order } from '@@types/index';
import OrderDetailModal from '@components/admin/order/realtime/modal/order-detail/OrderDetailModal';
import { areOrdersEquivalent } from '@utils/memoCompareFunction';
import useModal from '@hooks/useModal';
import { CardContainer, OrderInfoContainer, DescriptionContainer, CardText } from '@styles/orderCardStyles';

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
        <CardText size={16} weight={800}>
          {order.customerName}
        </CardText>
        <DescriptionContainer>
          <CardText size={12} weight={800}>{`주문번호 ${order.orderNumber}`}</CardText>
          <CardText size={12} weight={800}>{`총 ${order.totalPrice.toLocaleString()}원`}</CardText>
        </DescriptionContainer>
      </OrderInfoContainer>
      <OrderDetailModal order={order} isModalOpen={isModalOpen} closeModal={closeModal} />
    </CardContainer>
  );
}

export default memo(ServedOrderCard, arePropsEqual);
