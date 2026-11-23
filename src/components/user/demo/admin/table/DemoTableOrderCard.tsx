import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useSetAtom } from 'jotai';
import { Order, OrderStatus } from '@@types/index';
import { demoStateAtom } from '@jotai/user/demoAtoms';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { formatKoreanTime } from '@utils/formatDate';
import { formatProductSummary } from '@utils/orderProduct';

const CANCELLED_OPACITY = 0.55;

const cancelledCardStyle = css`
  opacity: ${CANCELLED_OPACITY};
`;

const Card = styled.div<{ isCancelled: boolean }>`
  width: 100%;
  box-sizing: border-box;
  padding: 10px 4px;
  border-bottom: 1px dashed ${Color.BORDER_GREY};
  cursor: pointer;
  gap: 4px;
  transition: background-color 0.12s ease-in-out;
  ${colFlex()};
  ${({ isCancelled }) => isCancelled && cancelledCardStyle}

  &:hover {
    background-color: ${Color.LIGHT_GREY};
  }
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

const OrderAmount = styled.div`
  font-size: 14px;
  font-weight: 800;
  font-variant-numeric: tabular-nums;
  color: ${Color.GREY};
`;

interface DemoTableOrderCardProps {
  order: Order;
}

function DemoTableOrderCard({ order }: DemoTableOrderCardProps) {
  const dispatch = useSetAtom(demoStateAtom);
  const formattedTime = formatKoreanTime(order.createdAt) || '시간 없음';

  return (
    <Card isCancelled={order.status === OrderStatus.CANCELLED} onClick={() => dispatch({ type: 'ORDER_OPEN', orderId: order.id })}>
      <OrderMeta>
        #{order.orderNumber} · {formattedTime}
      </OrderMeta>
      <ProductSummary>{formatProductSummary(order.orderProducts)}</ProductSummary>
      <BottomRow>
        <CustomerName>{order.customerName}</CustomerName>
        <OrderAmount>{order.totalPrice.toLocaleString()}원</OrderAmount>
      </BottomRow>
    </Card>
  );
}

export default DemoTableOrderCard;
