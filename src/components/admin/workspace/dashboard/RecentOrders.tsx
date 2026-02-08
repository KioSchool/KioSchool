import { Order } from '@@types/index';
import styled from '@emotion/styled';
import { match } from 'ts-pattern';
import DashboardCard from './DashboardCard';
import { colFlex } from '@styles/flexStyles';
import { EmptyText } from '@styles/dashboardStyles';
import RecentOrderCard from './RecentOrderCard';
import { useNavigate, useParams } from 'react-router-dom';

const OrderList = styled.div`
  width: 100%;
  gap: 8px;
  ${colFlex({})};
`;

const ActionButton = styled.button`
  font-size: 10px;
  color: #464a4d;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
`;

interface RecentOrdersProps {
  orders: Order[];
}

function RecentOrders({ orders }: RecentOrdersProps) {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/admin/workspace/${workspaceId}/order/realtime`);
  };

  const rightAction = <ActionButton onClick={handleNavigate}>실시간 주문 조회 페이지로 이동 {'>'}</ActionButton>;

  return (
    <DashboardCard title="최근 주문 내역" height={orders.length > 0 ? 217 : 100} rightAction={rightAction}>
      {match(orders.length)
        .with(0, () => <EmptyText>현재 표시할 주문 내역이 없습니다.</EmptyText>)
        .otherwise(() => (
          <OrderList>
            {orders.map((order) => (
              <RecentOrderCard key={order.id} order={order} />
            ))}
          </OrderList>
        ))}
    </DashboardCard>
  );
}

export default RecentOrders;
