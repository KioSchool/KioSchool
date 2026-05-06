import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { match } from 'ts-pattern';
import { RiArrowRightSLine } from '@remixicon/react';
import OrderStatusBadge from '@components/super-admin/orders/OrderStatusBadge';
import useSuperAdminOrders from '@hooks/super-admin/useSuperAdminOrders';
import { SuperAdminOrder } from '@@types/index';
import { getSuperAdminOrdersPath } from '@constants/routes';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { formatCurrency, formatKoreanDateTime } from '@utils/formatNumber';
import { mobileMediaQuery } from '@styles/globalStyles';

const RECENT_LIMIT = 5;

const Section = styled.div`
  width: 100%;
  gap: 8px;
  ${colFlex()}
`;

const HeaderRow = styled.div`
  width: 100%;
  ${rowFlex({ justify: 'space-between', align: 'center' })}
`;

const Title = styled.div`
  font-size: 11px;
  font-weight: 600;
  color: ${Color.GREY};
  text-transform: uppercase;
  letter-spacing: 0.04em;
`;

const ViewAllLink = styled(Link)`
  font-size: 12px;
  color: ${Color.GREY};
  text-decoration: none;
  gap: 2px;
  ${rowFlex({ align: 'center' })}

  &:hover {
    color: ${Color.BLACK};
  }
`;

const Stack = styled.div`
  width: 100%;
  gap: 4px;
  ${colFlex()}
`;

const OrderRow = styled.div`
  width: 100%;
  padding: 8px 10px;
  background: ${Color.WHITE};
  border: 1px solid ${Color.HEAVY_GREY};
  border-radius: 8px;
  font-size: 12px;
  color: ${Color.GREY};
  gap: 10px;
  flex-wrap: wrap;
  ${rowFlex({ align: 'center' })}

  ${mobileMediaQuery} {
    gap: 6px;
  }
`;

const OrderNumber = styled.span`
  font-weight: 600;
  color: ${Color.BLACK};
  white-space: nowrap;
`;

const TableInfo = styled.span`
  white-space: nowrap;
`;

const Spacer = styled.span`
  flex: 1;
`;

const Price = styled.span`
  font-weight: 600;
  color: ${Color.BLACK};
  white-space: nowrap;
`;

const Timestamp = styled.span`
  font-size: 11px;
  color: ${Color.HEAVY_GREY};
  white-space: nowrap;
`;

const EmptyText = styled.div`
  font-size: 12px;
  color: ${Color.HEAVY_GREY};
  padding: 8px 0;
`;

const LoadingText = styled.div`
  font-size: 12px;
  color: ${Color.HEAVY_GREY};
  padding: 8px 0;
`;

interface WorkspaceRecentOrdersProps {
  workspaceId: number;
}

type RecentOrdersState = { kind: 'loading' } | { kind: 'ready'; orders: SuperAdminOrder[] };

function WorkspaceRecentOrders({ workspaceId }: WorkspaceRecentOrdersProps) {
  const [state, setState] = useState<RecentOrdersState>({ kind: 'loading' });
  const { fetchAllOrders } = useSuperAdminOrders();

  useEffect(() => {
    let cancelled = false;
    fetchAllOrders({ workspaceId, page: 0, size: RECENT_LIMIT }).then((res) => {
      if (cancelled) return;
      setState({ kind: 'ready', orders: res.content });
    });
    return () => {
      cancelled = true;
    };
  }, [workspaceId, fetchAllOrders]);

  return (
    <Section>
      <HeaderRow>
        <Title>최근 주문</Title>
        <ViewAllLink to={getSuperAdminOrdersPath({ workspaceId })}>
          전체 주문 보기
          <RiArrowRightSLine size={14} />
        </ViewAllLink>
      </HeaderRow>
      {match(state)
        .with({ kind: 'loading' }, () => <LoadingText>최근 주문 불러오는 중...</LoadingText>)
        .with({ kind: 'ready', orders: [] }, () => <EmptyText>최근 주문이 없습니다.</EmptyText>)
        .with({ kind: 'ready' }, ({ orders }) => (
          <Stack>
            {orders.map((order) => (
              <OrderRow key={order.id}>
                <OrderNumber>#{order.orderNumber}</OrderNumber>
                <TableInfo>
                  {order.tableNumber}번 · {order.customerName}
                </TableInfo>
                <Spacer />
                <Price>{formatCurrency(order.totalPrice)}</Price>
                <OrderStatusBadge status={order.status} />
                <Timestamp>{formatKoreanDateTime(order.createdAt)}</Timestamp>
              </OrderRow>
            ))}
          </Stack>
        ))
        .exhaustive()}
    </Section>
  );
}

export default WorkspaceRecentOrders;
