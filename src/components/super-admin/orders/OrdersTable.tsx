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
  border: 1px solid ${Color.HEAVY_GREY};
`;

const Thead = styled.thead`
  background: ${Color.LIGHT_GREY};
`;

const Th = styled.th`
  padding: 10px 14px;
  text-align: left;
  font-size: 11px;
  font-weight: 600;
  color: ${Color.GREY};
  text-transform: uppercase;
  letter-spacing: 0.04em;
  border-bottom: 1px solid ${Color.HEAVY_GREY};
`;

const Tr = styled.tr`
  border-bottom: 1px solid ${Color.HEAVY_GREY};
  transition: background 0.15s;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: ${Color.LIGHT_GREY};
  }
`;

const Td = styled.td`
  padding: 12px 14px;
  font-size: 13px;
  color: ${Color.BLACK};
  vertical-align: middle;
`;

const WorkspaceName = styled.span`
  font-weight: 500;
  color: ${Color.BLACK};
`;

const WorkspaceIdSubText = styled.div`
  font-size: 11px;
  color: ${Color.HEAVY_GREY};
  margin-top: 2px;
`;

interface OrdersTableProps {
  orders: SuperAdminOrder[];
}

function OrdersTable({ orders }: OrdersTableProps) {
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
          <Tr key={order.id}>
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
