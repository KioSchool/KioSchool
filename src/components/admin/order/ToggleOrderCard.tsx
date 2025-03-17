import React from 'react';
import { Order } from '@@types/index';
import styled from '@emotion/styled';
import AppLabel from '@components/common/label/AppLabel';
import { RiArrowUpSLine } from '@remixicon/react';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { Color } from '@resources/colors';
import { orderStatusConverter } from '@utils/OrderStatusConverter';

interface ToggleOrderCardProps {
  order: Order;
}

const Container = styled.div`
  width: 100%;
  background: ${Color.LIGHT_GREY};
  padding: 20px 50px;
  box-sizing: border-box;
  ${rowFlex({ justify: 'space-between' })}
`;

const ProductContainer = styled.div`
  width: 200px;
  gap: 4px;
  ${colFlex()}
`;

const RightContainer = styled.div`
  gap: 15px;
  ${rowFlex({ align: 'center' })}
`;

const ToggleIcon = styled(RiArrowUpSLine)<{ isClosed: boolean }>`
  cursor: pointer;
  transform: ${({ isClosed }) => (isClosed ? 'rotate(180deg)' : 'none')};
`;

const OrderInfoContainer = styled.div`
  gap: 30px;
  ${colFlex({ justify: 'space-between' })}
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

  return (
    <Container className={'toggle-order-card-container'}>
      <AppLabel size={18} style={{ fontWeight: 700 }}>
        주문번호 {order.id}번
      </AppLabel>
      <ProductContainer className={'product-container'}>
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
      <RightContainer className={'right-container'}>
        <OrderInfoContainer className={'order-info-container'}>
          <AppLabel size={16}>
            {order.customerName} | {order.totalPrice.toLocaleString()}원 | {orderStatusConverter(order.status)}
          </AppLabel>
          {!isClosed && <AppLabel size={16}>{dateConverter(order.createdAt)}</AppLabel>}
        </OrderInfoContainer>
        <ToggleIcon onClick={handleToggle} isClosed={isClosed} />
      </RightContainer>
    </Container>
  );
}

export default ToggleOrderCard;
