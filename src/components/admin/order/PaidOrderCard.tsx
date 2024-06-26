import React from 'react';
import { Order } from '@@types/index';
import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';
import useAdminOrder from '@hooks/admin/useAdminOrder';
import AppLabel from '@components/common/label/AppLabel';
import HorizontalDivider from '@components/common/divider/HorizontalDivider';
import AppCheckBox from '@components/common/input/AppCheckBox';

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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-top: 10px;
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

function PaidOrderCard({ order }: Props) {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { serveOrder, refundOrder } = useAdminOrder(workspaceId);
  const { updateOrderProductServe } = useAdminOrder(workspaceId);

  const dateConverter = (dateStr: string) => {
    const date = new Date(dateStr);

    const isAm = date.getHours() < 12;
    const hour = isAm ? date.getHours() : date.getHours() - 12;

    return `${hour}시 ${date.getMinutes()}분`;
  };

  return (
    <Container>
      <AppLabel size={18} style={{ fontWeight: 700 }}>
        테이블 {order.tableNumber}
      </AppLabel>
      <Row>
        <AppLabel size={14}>주문번호 {order.id}번</AppLabel>
        <AppLabel size={14}>{dateConverter(order.createdAt)}</AppLabel>
      </Row>
      <HorizontalDivider />
      {order.orderProducts.map((it) => (
        <Row key={it.id}>
          <AppCheckBox
            checked={it.isServed}
            onChange={() => {
              updateOrderProductServe(it.id, !it.isServed);
            }}
            label={it.productName}
          />
          <AppLabel size={16}>{it.quantity}개</AppLabel>
        </Row>
      ))}
      <HorizontalDivider />
      <Row>
        <AppLabel size={16} style={{ fontWeight: 500 }}>
          총 주문 금액
        </AppLabel>
        <AppLabel size={16} style={{ fontWeight: 500 }}>
          {order.totalPrice.toLocaleString()}원
        </AppLabel>
      </Row>
      <ButtonContainer>
        <Button type={'button'} onClick={() => refundOrder(order.id)}>
          되돌리기
        </Button>
        <Button type={'button'} onClick={() => serveOrder(order.id)}>
          서빙 완료
        </Button>
      </ButtonContainer>
    </Container>
  );
}

export default PaidOrderCard;
