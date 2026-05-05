import styled from '@emotion/styled';
import { SuperAdminOrder } from '@@types/index';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { formatCurrency, formatKoreanDateTime } from '@utils/formatNumber';
import OrderStatusBadge from './OrderStatusBadge';

const List = styled.div`
  width: 100%;
  gap: 8px;
  ${colFlex()}
`;

const Card = styled.div`
  background: ${Color.WHITE};
  border: 1px solid ${Color.HEAVY_GREY};
  border-radius: 10px;
  padding: 12px 14px;
  gap: 6px;
  ${colFlex()}
`;

const HeaderRow = styled.div`
  width: 100%;
  gap: 8px;
  ${rowFlex({ align: 'center', justify: 'space-between' })}
`;

const WorkspaceName = styled.span`
  font-weight: 600;
  color: ${Color.BLACK};
  font-size: 13px;
`;

const InfoLine = styled.div`
  font-size: 12px;
  color: ${Color.GREY};
`;

const Price = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: ${Color.BLACK};
`;

const TimestampLine = styled.div`
  font-size: 11px;
  color: ${Color.HEAVY_GREY};
`;

interface OrdersCardListProps {
  orders: SuperAdminOrder[];
}

function OrdersCardList({ orders }: OrdersCardListProps) {
  return (
    <List>
      {orders.map((order) => (
        <Card key={order.id}>
          <HeaderRow>
            <WorkspaceName>{order.workspaceName}</WorkspaceName>
            <OrderStatusBadge status={order.status} />
          </HeaderRow>
          <InfoLine>
            ID: {order.workspaceId} · {order.tableNumber}번 테이블
          </InfoLine>
          <InfoLine>
            손님: {order.customerName} · 주문 #{order.orderNumber}
          </InfoLine>
          <Price>{formatCurrency(order.totalPrice)}</Price>
          <TimestampLine>{formatKoreanDateTime(order.createdAt)}</TimestampLine>
        </Card>
      ))}
    </List>
  );
}

export default OrdersCardList;
