import styled from '@emotion/styled';
import { match, P } from 'ts-pattern';
import { SuperAdminOrder } from '@@types/index';
import { mobileMediaQuery } from '@styles/globalStyles';
import OrdersTable from './OrdersTable';
import OrdersCardList from './OrdersCardList';
import OrdersEmptyState from './OrdersEmptyState';

const Container = styled.div`
  width: 100%;
`;

const DesktopOnly = styled.div`
  width: 100%;

  ${mobileMediaQuery} {
    display: none;
  }
`;

const MobileOnly = styled.div`
  width: 100%;
  display: none;

  ${mobileMediaQuery} {
    display: block;
  }
`;

interface OrdersResultAreaProps {
  orders: SuperAdminOrder[];
  selectedOrderId: number | null;
  onSelect: (order: SuperAdminOrder) => void;
  onResetFilter: () => void;
}

function OrdersResultArea({ orders, selectedOrderId, onSelect, onResetFilter }: OrdersResultAreaProps) {
  return match(orders)
    .with([], () => <OrdersEmptyState onReset={onResetFilter} />)
    .with(P.array(), (list) => (
      <Container>
        <DesktopOnly>
          <OrdersTable orders={list} selectedOrderId={selectedOrderId} onSelect={onSelect} />
        </DesktopOnly>
        <MobileOnly>
          <OrdersCardList orders={list} selectedOrderId={selectedOrderId} onSelect={onSelect} />
        </MobileOnly>
      </Container>
    ))
    .exhaustive();
}

export default OrdersResultArea;
