import styled from '@emotion/styled';
import { SuperAdminOrder } from '@@types/index';
import { Color } from '@resources/colors';
import { formatCurrency, formatKoreanDateTime } from '@utils/formatNumber';
import OrderStatusBadge from './OrderStatusBadge';

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: ${Color.WHITE};
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #f0f0f0;
`;

const Thead = styled.thead`
  background: #fcfcfc;
`;

const Th = styled.th`
  padding: 10px 14px;
  text-align: left;
  font-size: 11px;
  font-weight: 600;
  color: ${Color.GREY};
  text-transform: uppercase;
  letter-spacing: 0.04em;
  border-bottom: 1px solid #f0f0f0;
`;

const Tr = styled.tr<{ active: boolean }>`
  border-bottom: 1px solid #f7f7f7;
  cursor: pointer;
  background: ${({ active }) => (active ? '#FFF3E7' : 'transparent')};
  transition: background 0.15s;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: ${({ active }) => (active ? '#FFF3E7' : '#fcfaf6')};
  }
`;

const Td = styled.td`
  padding: 12px 14px;
  font-size: 13px;
  color: ${Color.BLACK};
  vertical-align: middle;
`;

const WorkspaceName = styled.span`
  font-weight: 600;
  color: ${Color.BLACK};
`;

const WorkspaceIdSubText = styled.div`
  font-size: 11px;
  color: ${Color.HEAVY_GREY};
  margin-top: 2px;
`;

interface OrdersTableProps {
  orders: SuperAdminOrder[];
  selectedOrderId: number | null;
  onSelect: (order: SuperAdminOrder) => void;
}

function OrdersTable({ orders, selectedOrderId, onSelect }: OrdersTableProps) {
  return (
    <Table>
      <Thead>
        <tr>
          <Th>워크스페이스</Th>
          <Th>테이블</Th>
          <Th>고객명</Th>
          <Th>주문번호</Th>
          <Th>금액</Th>
          <Th>상태</Th>
          <Th>주문 시각</Th>
        </tr>
      </Thead>
      <tbody>
        {orders.map((order) => (
          <Tr key={order.id} active={selectedOrderId === order.id} onClick={() => onSelect(order)}>
            <Td>
              <WorkspaceName>{order.workspaceName}</WorkspaceName>
              <WorkspaceIdSubText>ID: {order.workspaceId}</WorkspaceIdSubText>
            </Td>
            <Td>{order.tableNumber}번</Td>
            <Td>{order.customerName}</Td>
            <Td>#{order.orderNumber}</Td>
            <Td>{formatCurrency(order.totalPrice)}</Td>
            <Td>
              <OrderStatusBadge status={order.status} />
            </Td>
            <Td>{formatKoreanDateTime(order.createdAt)}</Td>
          </Tr>
        ))}
      </tbody>
    </Table>
  );
}

export default OrdersTable;
