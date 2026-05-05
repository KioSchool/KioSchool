import styled from '@emotion/styled';
import { OrderStatus } from '@@types/index';
import { STATUS_LABELS, STATUS_PALETTE } from '@constants/data/orderStatus';
import { rowFlex } from '@styles/flexStyles';

const Badge = styled.span<{ status: OrderStatus }>`
  gap: 6px;
  font-size: 12px;
  font-weight: 600;
  color: ${({ status }) => STATUS_PALETTE[status].text};
  white-space: nowrap;
  ${rowFlex({ align: 'center' })}
`;

const Dot = styled.span<{ status: OrderStatus }>`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${({ status }) => STATUS_PALETTE[status].dot};
  flex-shrink: 0;
`;

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  return (
    <Badge status={status}>
      <Dot status={status} />
      {STATUS_LABELS[status]}
    </Badge>
  );
}

export default OrderStatusBadge;
