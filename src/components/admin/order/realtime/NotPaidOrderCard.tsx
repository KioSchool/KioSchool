import { memo } from 'react';
import { Order } from '@@types/index';
import useAdminOrder from '@hooks/admin/useAdminOrder';
import { useParams } from 'react-router-dom';
import OrderDetailModal from '@components/admin/order/realtime/modal/order-detail/OrderDetailModal';
import { areOrdersEquivalent } from '@utils/memoCompareFunction';
import useFormattedTime from '@hooks/useFormattedTime';
import useModal from '@hooks/useModal';
import { extractMinFromDate } from '@utils/formatDate';
import { CardContainer, OrderInfoContainer, DescriptionContainer, CardFooter, CheckIcon, CardText, TableNumberBadge } from '@styles/orderCardStyles';

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
    <CardContainer height={84}>
      <OrderInfoContainer onClick={orderInfoClickHandler}>
        <CardText size={16} weight={800}>
          {order.customerName}
        </CardText>
        <DescriptionContainer>
          <CardText size={12} weight={800}>{`${delayMinutes}분 전`}</CardText>
          <CardText size={12} weight={800}>{`총 ${order.totalPrice.toLocaleString()}원`}</CardText>
        </DescriptionContainer>
      </OrderInfoContainer>
      <OrderDetailModal order={order} isModalOpen={isModalOpen} closeModal={closeModal} />
      <CardFooter>
        <TableNumberBadge>{`테이블 ${order.tableNumber}`}</TableNumberBadge>
        <CheckIcon onClick={checkClickHandler} />
      </CardFooter>
    </CardContainer>
  );
}

export default memo(NotPaidOrderCard, arePropsEqual);
