import React from 'react';
import { Order } from '@@types/index';
import styled from '@emotion/styled';
import AppLabel from '@components/common/label/AppLabel';
import ArrowUpSvg from '@resources/svg/ArrowUpSvg';

interface ToggleOrderCardProps {
  order: Order;
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  background: #f7f7f7;
  padding: 20px 50px;
  box-sizing: border-box;
`;

const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  gap: 4px;
`;

const RightContainer = styled.div`
  display: flex;
  gap: 15px;
`;

const OrderInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 30px;
`;

function ToggleOrderCard({ order }: ToggleOrderCardProps) {
  const [isClosed, setIsClosed] = React.useState<boolean>(true);

  const closedProductLabelText =
    order.orderProducts.length > 1 ? `${order.orderProducts[0].productName} 외 ${order.orderProducts.length - 1}개` : order.orderProducts[0].productName;

  const handleToggle = () => {
    setIsClosed((prev) => !prev);
  };

  const dateConverter = (dateStr: string) => {
    const date = new Date(dateStr);

    const isAm = date.getHours() < 12;
    const hour = isAm ? date.getHours() : date.getHours() - 12;

    return `${date.getMonth() + 1}월 ${date.getDate()}일 ${isAm ? '오전' : '오후'} ${hour}시 ${date.getMinutes()}분`;
  };

  const orderStatusConverter = (status: string) => {
    switch (status) {
      case 'PAID':
        return '결제 완료';
      case 'NOT_PAID':
        return '결제 대기';
      case 'SERVED':
        return '서빙 완료';
      case 'CANCELLED':
        return '주문 취소';
      default:
        return '알 수 없음';
    }
  };

  return (
    <Container>
      <AppLabel size={18} style={{ fontWeight: 700 }}>
        주문번호 {order.id}번
      </AppLabel>
      <ProductContainer>
        {isClosed ? (
          <AppLabel size={16}>{closedProductLabelText}</AppLabel>
        ) : (
          order.orderProducts.map((orderProduct) => (
            <AppLabel key={orderProduct.id} size={16}>
              {orderProduct.productName} · {orderProduct.quantity}개
            </AppLabel>
          ))
        )}
      </ProductContainer>
      <RightContainer>
        <OrderInfoContainer>
          <AppLabel size={16}>
            {order.customerName} | {order.totalPrice.toLocaleString()}원 | {orderStatusConverter(order.status)}
          </AppLabel>
          {!isClosed && <AppLabel size={16}>{dateConverter(order.createdAt)}</AppLabel>}
        </OrderInfoContainer>
        <ArrowUpSvg onClick={handleToggle} style={isClosed ? { transform: 'rotate(180deg)', cursor: 'pointer' } : { cursor: 'pointer' }} />
      </RightContainer>
    </Container>
  );
}

export default ToggleOrderCard;
