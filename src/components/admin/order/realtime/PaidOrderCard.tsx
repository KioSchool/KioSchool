import { memo } from 'react';
import { Order } from '@@types/index';
import OrderDetailModal from '@components/admin/order/realtime/modal/order-detail/OrderDetailModal';
import OrderItemList from '@components/admin/order/realtime/OrderItemList';
import { areOrdersEquivalent } from '@utils/MemoCompareFunction';
import useModal from '@hooks/useModal';
import { extractMinFromDate } from '@utils/FormatDate';
import useFormattedTime from '@hooks/useFormattedTime';
import { CardContainer, CardText, DescriptionContainer, HeaderContainer, HorizontalLine, OrderInfoContainer } from '@styles/orderCardStyles';

const arePropsEqual = (prevProps: OrderCardProps, nextProps: OrderCardProps) => {
  return areOrdersEquivalent(prevProps.order, nextProps.order);
};

interface OrderCardProps {
  order: Order;
}

function PaidOrderCard({ order }: OrderCardProps) {
  const delayMinutes = useFormattedTime<number>({ date: order.createdAt, formatter: extractMinFromDate });
  const { isModalOpen, openModal, closeModal } = useModal();

  const orderInfoClickHandler = () => {
    openModal();
  };

  return (
    <CardContainer height={234}>
      <OrderInfoContainer onClick={orderInfoClickHandler}>
        <HeaderContainer>
          <CardText size={16} weight={800} height={24}>
            {order.customerName}
          </CardText>
          <DescriptionContainer>
            <CardText size={12} weight={800}>{`${delayMinutes}분 전`}</CardText>
            <CardText size={12} weight={800}>{`총 ${order.totalPrice.toLocaleString()}원`}</CardText>
          </DescriptionContainer>
        </HeaderContainer>
        <HorizontalLine />
        <OrderItemList order={order} />
      </OrderInfoContainer>
      <OrderDetailModal order={order} isModalOpen={isModalOpen} closeModal={closeModal} />
    </CardContainer>
  );
}

export default memo(PaidOrderCard, arePropsEqual);
