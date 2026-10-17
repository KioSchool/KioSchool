import { memo } from 'react';
import { Order } from '@@types/index';
import OrderDetailModal from '@components/admin/order/realtime/modal/order-detail/OrderDetailModal';
import OrderItemList from './OrderItemList';
import { areOrdersEquivalent } from '@utils/memoCompareFunction';
import useModal from '@hooks/useModal';
import { extractMinFromDate } from '@utils/formatDate';
import useFormattedTime from '@hooks/useFormattedTime';
import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { CardContainer, CardText, DescriptionContainer, HeaderContainer, HorizontalLine, OrderInfoContainer } from '@styles/orderCardStyles';
import { ELAPSED_LEVEL_STYLE, ElapsedLevel, getElapsedLevel } from '@utils/orderElapsed';

// 시급할수록 카드 면과 테두리를 칠한다. hover 주황 반전은 공용 규칙이 더 강해서 그대로 동작한다
const PaidCardContainer = styled(CardContainer)<{ level: ElapsedLevel }>`
  background-color: ${({ level }) => ELAPSED_LEVEL_STYLE[level].surface};
  border-color: ${({ level }) => ELAPSED_LEVEL_STYLE[level].border};
`;

const ElapsedText = styled(CardText)<{ level: ElapsedLevel }>`
  color: ${({ level }) => ELAPSED_LEVEL_STYLE[level].text};
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
  const { isModalOpen, openModal, closeModal } = useModal();

  const orderInfoClickHandler = () => {
    openModal();
  };

  return (
    <PaidCardContainer height={234} level={level}>
      <OrderInfoContainer onClick={orderInfoClickHandler}>
        <HeaderContainer>
          <CardText size={16} weight={800} height={24}>
            {`${order.tableNumber}번 테이블`}
          </CardText>
          <DescriptionContainer>
            <ElapsedText size={12} weight={800} level={level}>{`${delayMinutes}분 전`}</ElapsedText>
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
