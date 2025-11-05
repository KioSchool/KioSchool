import { Order } from '@@types/index';
import { RiSearchLine } from '@remixicon/react';
import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { rowFlex } from '@styles/flexStyles';
import { formatKoreanTime } from '@utils/formatDate';
import useModal from '@hooks/useModal';
import TableOrderDetailModal from '../modal/TableOrderDetailModal';

const OrderRow = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 1.2fr 1.8fr 1fr 1fr 1fr 0.5fr;
  padding: 10px;
  border-bottom: 1px solid ${Color.LIGHT_GREY};
  text-align: center;
  align-items: center;
`;

const OrderCell = styled.div`
  color: ${Color.GREY};
`;

const ActionCell = styled.div`
  ${rowFlex({ justify: 'center', align: 'center' })};
`;

const SearchIcon = styled(RiSearchLine)`
  color: ${Color.GREY};
  cursor: pointer;
`;

const ORDER_STATUS_MAP = {
  NOT_PAID: '주문 완료',
  PAID: '결제 완료',
  SERVED: '서빙 완료',
};

const formatProductNames = (orderProducts: any[] | undefined) => {
  if (!orderProducts || orderProducts.length === 0) {
    return '상품 없음';
  }
  if (orderProducts.length === 1) {
    return orderProducts[0].productName;
  }
  return `${orderProducts[0].productName} 외 ${orderProducts.length - 1}개`;
};

interface OrderRowItemProps {
  order: Order;
}

function OrderRowItem({ order }: OrderRowItemProps) {
  const { isModalOpen, openModal, closeModal } = useModal();
  const formattedStartTime = formatKoreanTime(order.createdAt) || '시간 없음';

  return (
    <>
      <OrderRow>
        <OrderCell>{order.orderNumber}</OrderCell>
        <OrderCell>{formattedStartTime}</OrderCell>
        <OrderCell>{formatProductNames(order.orderProducts)}</OrderCell>
        <OrderCell>{order.customerName}</OrderCell>
        <OrderCell>{`${order.totalPrice.toLocaleString()}원`}</OrderCell>
        <OrderCell>{ORDER_STATUS_MAP[order.status as keyof typeof ORDER_STATUS_MAP] || order.status}</OrderCell>
        <ActionCell>
          <SearchIcon onClick={openModal} />
        </ActionCell>
      </OrderRow>
      <TableOrderDetailModal order={order} isModalOpen={isModalOpen} closeModal={closeModal} />
    </>
  );
}

export default OrderRowItem;
