import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { formatKoreanTime } from '@utils/formatDate';
import useModal from '@hooks/useModal';
import OrderDetailModal from '@components/admin/order/realtime/modal/order-detail/OrderDetailModal';
import { Order, OrderProduct, OrderStatus } from '@@types/index';

const CANCELLED_OPACITY = 0.55;

const Card = styled.div<{ isCancelled: boolean }>`
  width: 100%;
  box-sizing: border-box;
  padding: 10px 4px;
  border-bottom: 1px dashed ${Color.BORDER_GREY};
  cursor: pointer;
  gap: 4px;
  opacity: ${({ isCancelled }) => (isCancelled ? CANCELLED_OPACITY : 1)};
  transition: background-color 0.12s ease-in-out;
  ${colFlex()};

  &:hover {
    background-color: ${Color.LIGHT_GREY};
  }
`;

const CancelledChip = styled.span`
  margin-left: 6px;
  padding: 2px 6px;
  border-radius: 999px;
  font-size: 10px;
  font-weight: 700;
  background-color: ${Color.LIGHT_RED};
  color: ${Color.RED};
`;

const OrderMeta = styled.div`
  font-size: 11px;
  font-variant-numeric: tabular-nums;
  color: ${Color.MUTED_GREY};
`;

const ProductSummary = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: ${Color.GREY};
`;

const BottomRow = styled.div`
  ${rowFlex({ justify: 'space-between', align: 'center' })};
`;

const CustomerName = styled.div`
  font-size: 12px;
  color: ${Color.MUTED_GREY};
`;

const OrderAmount = styled.div<{ isCancelled: boolean }>`
  font-size: 14px;
  font-weight: 800;
  font-variant-numeric: tabular-nums;
  text-decoration: ${({ isCancelled }) => (isCancelled ? 'line-through' : 'none')};
  color: ${Color.GREY};
`;

function formatProductSummary(orderProducts: OrderProduct[] | undefined): string {
  if (!orderProducts || orderProducts.length === 0) return '상품 없음';
  if (orderProducts.length === 1) return orderProducts[0].productName;

  return `${orderProducts[0].productName} 외 ${orderProducts.length - 1}건`;
}

interface TableOrderCardProps {
  order: Order;
}

function TableOrderCard({ order }: TableOrderCardProps) {
  const { isModalOpen, openModal, closeModal } = useModal();
  const formattedTime = formatKoreanTime(order.createdAt) || '시간 없음';
  const isCancelled = order.status === OrderStatus.CANCELLED;

  return (
    <>
      <Card isCancelled={isCancelled} onClick={openModal}>
        <OrderMeta>
          #{order.orderNumber} · {formattedTime}
          {isCancelled && <CancelledChip>취소</CancelledChip>}
        </OrderMeta>
        <ProductSummary>{formatProductSummary(order.orderProducts)}</ProductSummary>
        <BottomRow>
          <CustomerName>{order.customerName}</CustomerName>
          <OrderAmount isCancelled={isCancelled}>{order.totalPrice.toLocaleString()}원</OrderAmount>
        </BottomRow>
      </Card>
      <OrderDetailModal order={order} isModalOpen={isModalOpen} closeModal={closeModal} readOnly />
    </>
  );
}

export default TableOrderCard;
