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
}

function OrdersResultArea({ orders }: OrdersResultAreaProps) {
  return match(orders)
    .with([], () => <OrdersEmptyState />)
    .with(P.array(), (list) => (
      <Container>
        <DesktopOnly>
          <OrdersTable orders={list} />
        </DesktopOnly>
        <MobileOnly>
          <OrdersCardList orders={list} />
        </MobileOnly>
      </Container>
    ))
    .exhaustive();
}

export default OrdersResultArea;
