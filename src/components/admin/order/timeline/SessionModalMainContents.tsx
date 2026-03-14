import { useMemo } from 'react';
import styled from '@emotion/styled';
import { OrderSessionWithOrder, Product } from '@@types/index';
import { colFlex } from '@styles/flexStyles';
import { adminProductsAtom } from '@jotai/admin/atoms';
import { useAtomValue } from 'jotai';
import { timelineColors } from './timelineConstants';
import SessionOrderCard from './SessionOrderCard';

const ModalBody = styled.div`
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
`;

const SectionTitle = styled.div`
  padding: 16px 30px 8px;
  font-size: 16px;
  font-weight: 700;
  color: ${timelineColors.TEXT_PRIMARY};
`;

const OrderList = styled.div`
  padding: 0 30px 20px;
  gap: 8px;
  ${colFlex()}
`;

const EmptyOrders = styled.div`
  padding: 60px 0;
  font-size: 14px;
  color: ${timelineColors.TEXT_SECONDARY};
  text-align: center;
`;

interface SessionModalMainContentsProps {
  session: OrderSessionWithOrder;
}

function SessionModalMainContents({ session }: SessionModalMainContentsProps) {
  const products = useAtomValue(adminProductsAtom);
  const productMap: Record<number, Product | undefined> = useMemo(() => Object.fromEntries(products.map((product) => [product.id, product])), [products]);

  if (session.orders.length === 0) {
    return (
      <ModalBody>
        <EmptyOrders>주문 내역이 없습니다</EmptyOrders>
      </ModalBody>
    );
  }

  return (
    <ModalBody>
      <SectionTitle>주문 내역</SectionTitle>
      <OrderList>
        {session.orders.map((order) => (
          <SessionOrderCard key={order.id} order={order} productMap={productMap} />
        ))}
      </OrderList>
    </ModalBody>
  );
}

export default SessionModalMainContents;
