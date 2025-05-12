import { Order, OrderStatus } from '@@types/index';
import React from 'react';
import ToggleOrderCard from './ToggleOrderCard';
import { colFlex } from '@styles/flexStyles';
import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import SearchBar from '@components/common/input/SearchBar';

const FallbackContainer = styled.div`
  width: 100%;
  height: 500px;
  ${colFlex({ justify: 'center', align: 'center' })};
  font-size: 20px;
  color: ${Color.GREY};
  font-weight: 600;
`;

const Container = styled.div`
  width: 100%;
  gap: 25px;
  ${colFlex({ align: 'center' })};
`;

const OrderCardContainer = styled.div`
  width: 100%;
  height: 500px;
  gap: 10px;
  overflow: auto;
  ${colFlex()}
`;

interface TotalOrderProps {
  orders: Order[];
  fetchOrders: (props: { startDate: string; endDate: string; status?: OrderStatus }) => void;
  params: { startDate: string; endDate: string; status?: OrderStatus };
}

function TotalOrder({ orders, fetchOrders, params }: TotalOrderProps) {
  if (!orders || orders.length === 0) {
    return <FallbackContainer>주문 내역이 없습니다.</FallbackContainer>;
  }

  return (
    <Container>
      <SearchBar placeholder={'주문자명이나 주문번호를 입력해주세요.'} fetchContents={() => fetchOrders(params)} />
      <OrderCardContainer>
        {orders.map((order) => (
          <ToggleOrderCard key={order.id} order={order} />
        ))}
      </OrderCardContainer>
    </Container>
  );
}

export default TotalOrder;
