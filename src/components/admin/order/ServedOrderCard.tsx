import React from 'react';
import { Order } from '@@types/index';
import styled from '@emotion/styled';
import AppLabel from '@components/common/label/AppLabel';
import HorizontalDivider from '@components/common/divider/HorizontalDivider';
import useAdminOrder from '@hooks/admin/useAdminOrder';
import { useParams } from 'react-router-dom';

interface Props {
  order: Order;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 22px;
  width: 350px;
  box-sizing: border-box;
  background: #f7f7f7;
  gap: 7px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 5px;
  box-sizing: border-box;
`;

const Button = styled.button`
  width: 80px;
  height: 30px;
  border: none;
  background: #eb6d09;
  color: white;
  cursor: pointer;
  border-radius: 50px;
  &:hover {
    background: #ff8c3a;
  }
`;

function ServedOrderCard({ order }: Props) {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { payOrder } = useAdminOrder(workspaceId);

  return (
    <Container>
      <AppLabel size={18} style={{ fontWeight: 700 }}>
        주문번호 {order.id}번
      </AppLabel>
      <Row>
        <AppLabel size={14}>입금자명: {order.customerName}</AppLabel>
        <AppLabel size={14}>테이블 {order.tableNumber}</AppLabel>
      </Row>
      <HorizontalDivider />
      <Row>
        <AppLabel size={16} style={{ fontWeight: 500 }}>
          총 주문 금액
        </AppLabel>
        <AppLabel size={16} style={{ fontWeight: 500 }}>
          {order.totalPrice.toLocaleString()}원
        </AppLabel>
      </Row>
      <Button type={'button'} onClick={() => payOrder(order.id)}>
        되돌리기
      </Button>
    </Container>
  );
}

export default ServedOrderCard;
