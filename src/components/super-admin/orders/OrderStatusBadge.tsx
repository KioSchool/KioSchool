import styled from '@emotion/styled';
import { OrderStatus } from '@@types/index';
import { STATUS_LABELS, STATUS_PALETTE } from '@constants/data/orderStatus';
import { rowFlex } from '@styles/flexStyles';

const Pill = styled.span<{ status: OrderStatus }>`
  padding: 2px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  background: ${({ status }) => STATUS_PALETTE[status].bg};
  color: ${({ status }) => STATUS_PALETTE[status].text};
  text-decoration: ${({ status }) => (STATUS_PALETTE[status].lineThrough ? 'line-through' : 'none')};
  white-space: nowrap;
  ${rowFlex({ align: 'center', justify: 'center' })}
`;

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  return <Pill status={status}>{STATUS_LABELS[status]}</Pill>;
}

export default OrderStatusBadge;
