import { useState } from 'react';
import styled from '@emotion/styled';
import { match } from 'ts-pattern';
import { RiArrowDownSLine } from '@remixicon/react';
import { Order, OrderStatus } from '@@types/index';
import { USER_STATUS_LABELS } from '@constants/data/orderStatus';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { formatKoreanTime } from '@utils/formatDate';
import { OrderCardDivider, OrderItemName, OrderItemQuantity } from '@components/user/order/orderCardStyles';

const getCardBorder = (isCurrent: boolean) =>
  match(isCurrent)
    .with(true, () => `1.5px solid ${Color.KIO_ORANGE}`)
    .otherwise(() => `1px solid ${Color.BORDER_GREY}`);

const getSummaryColor = (isCancelled: boolean) =>
  match(isCancelled)
    .with(true, () => Color.TEXT_HINT)
    .otherwise(() => Color.TEXT_STRONG);

const Container = styled.div<{ isCurrent: boolean }>`
  box-sizing: border-box;
  width: 100%;
  padding: 16px 20px;
  border-radius: 16px;
  border: ${({ isCurrent }) => getCardBorder(isCurrent)};
  background: ${Color.WHITE};
  cursor: pointer;
  gap: 4px;
  ${colFlex()}
`;

const SummaryRow = styled.div`
  width: 100%;
  ${rowFlex({ justify: 'space-between', align: 'center' })}
`;

const StatusText = styled.div<{ isCancelled: boolean }>`
  font-size: 15px;
  font-weight: 700;
  color: ${({ isCancelled }) => getSummaryColor(isCancelled)};
`;

const PriceContainer = styled.div`
  gap: 4px;
  ${rowFlex({ align: 'center' })}
`;

const PriceText = styled.div<{ isCancelled: boolean }>`
  font-size: 15px;
  font-weight: 700;
  color: ${({ isCancelled }) => getSummaryColor(isCancelled)};
  text-decoration: ${({ isCancelled }) => (isCancelled ? 'line-through' : 'none')};
`;

const ToggleIcon = styled(RiArrowDownSLine, {
  shouldForwardProp: (prop) => prop !== 'expanded',
})<{ expanded: boolean }>`
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  fill: ${Color.TEXT_HINT};
  transition: transform 0.15s;
  transform: rotate(${({ expanded }) => (expanded ? '180deg' : '0deg')});
`;

const MetaText = styled.div`
  font-size: 13px;
  color: ${Color.TEXT_SUBTLE};
`;

const CurrentLabel = styled.span`
  color: ${Color.KIO_ORANGE};
  font-weight: 600;
`;

const ProductContainer = styled.div`
  width: 100%;
  margin-top: 8px;
  gap: 10px;
  ${colFlex()}
`;

const ProductRow = styled.div`
  width: 100%;
  ${rowFlex({ justify: 'space-between' })}
`;

const ProductText = styled.div`
  font-size: 14px;
  color: ${Color.TEXT_DEFAULT};
`;

interface SessionOrderCardProps {
  order: Order;
  isCurrent: boolean;
}

function SessionOrderCard({ order, isCurrent }: SessionOrderCardProps) {
  const [expanded, setExpanded] = useState(false);
  const isCancelled = order.status === OrderStatus.CANCELLED;

  const handleCardClick = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <Container isCurrent={isCurrent} onClick={handleCardClick}>
      <SummaryRow>
        <StatusText isCancelled={isCancelled}>{USER_STATUS_LABELS[order.status]}</StatusText>
        <PriceContainer>
          <PriceText isCancelled={isCancelled}>{order.totalPrice.toLocaleString()}원</PriceText>
          <ToggleIcon expanded={expanded} />
        </PriceContainer>
      </SummaryRow>
      <MetaText>
        주문번호 {order.orderNumber} · {formatKoreanTime(order.createdAt)}
        {isCurrent && ' · '}
        {isCurrent && <CurrentLabel>이번 주문</CurrentLabel>}
      </MetaText>
      {expanded && (
        <ProductContainer>
          <OrderCardDivider />
          {order.orderProducts.map((orderProduct) => (
            <ProductRow key={orderProduct.id}>
              <OrderItemName>
                {orderProduct.productName}
                <OrderItemQuantity>{orderProduct.quantity}개</OrderItemQuantity>
              </OrderItemName>
              <ProductText>{orderProduct.totalPrice.toLocaleString()}원</ProductText>
            </ProductRow>
          ))}
        </ProductContainer>
      )}
    </Container>
  );
}

export default SessionOrderCard;
