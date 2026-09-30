import { memo } from 'react';
import styled from '@emotion/styled';
import { Order } from '@@types/index';
import OrderDetailModal from '@components/admin/order/realtime/modal/order-detail/OrderDetailModal';
import { areOrdersEquivalent } from '@utils/memoCompareFunction';
import useModal from '@hooks/useModal';
import { CardContainer, OrderInfoContainer, DescriptionContainer, CardText, CardFooter, TableNumberBadge } from '@styles/orderCardStyles';

const ServedCardFooter = styled(CardFooter)`
  height: 32px;
  padding-top: 8px;
`;

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
    <CardContainer height={80}>
      <OrderInfoContainer onClick={orderInfoClickHandler}>
        <CardText size={16} weight={800}>
          {order.customerName}
        </CardText>
        <DescriptionContainer>
          <CardText size={12} weight={800}>{`주문번호 ${order.orderNumber}`}</CardText>
          <CardText size={12} weight={800}>{`총 ${order.totalPrice.toLocaleString()}원`}</CardText>
        </DescriptionContainer>
        <ServedCardFooter>
          <TableNumberBadge>{`테이블 ${order.tableNumber}`}</TableNumberBadge>
        </ServedCardFooter>
      </OrderInfoContainer>
      <OrderDetailModal order={order} isModalOpen={isModalOpen} closeModal={closeModal} />
    </CardContainer>
  );
}

export default memo(ServedOrderCard, arePropsEqual);
