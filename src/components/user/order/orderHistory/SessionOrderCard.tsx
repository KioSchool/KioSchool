import { useState } from 'react';
import styled from '@emotion/styled';
import { RiArrowDownSLine } from '@remixicon/react';
import { Order, OrderStatus } from '@@types/index';
import { USER_STATUS_LABELS } from '@constants/data/orderStatus';
import HorizontalDivider from '@components/common/divider/HorizontalDivider';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { formatKoreanTime } from '@utils/formatDate';

const Container = styled.div<{ isCurrent: boolean }>`
  box-sizing: border-box;
  width: 100%;
  padding: 14px 20px;
  border-radius: 9px;
  border: ${({ isCurrent }) => (isCurrent ? `1.5px solid ${Color.KIO_ORANGE}` : '0.5px solid #939393')};
  cursor: pointer;
  gap: 4px;
  ${colFlex()}
`;

const SummaryRow = styled.div`
  width: 100%;
  ${rowFlex({ justify: 'space-between', align: 'center' })}
`;

const StatusText = styled.div<{ isCancelled: boolean }>`
  font-size: 13px;
  font-weight: ${({ isCancelled }) => (isCancelled ? 400 : 600)};
  color: ${({ isCancelled }) => (isCancelled ? Color.MUTED_GREY : Color.GREY)};
`;

const PriceContainer = styled.div`
  gap: 4px;
  ${rowFlex({ align: 'center' })}
`;

const PriceText = styled.div<{ isCancelled: boolean }>`
  font-size: 13px;
  font-weight: ${({ isCancelled }) => (isCancelled ? 400 : 600)};
  color: ${({ isCancelled }) => (isCancelled ? Color.MUTED_GREY : Color.GREY)};
  text-decoration: ${({ isCancelled }) => (isCancelled ? 'line-through' : 'none')};
`;

const ToggleIcon = styled(RiArrowDownSLine, {
  shouldForwardProp: (prop) => prop !== 'expanded',
})<{ expanded: boolean }>`
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  fill: ${Color.MUTED_GREY};
  transition: transform 0.15s;
  transform: rotate(${({ expanded }) => (expanded ? '180deg' : '0deg')});
`;

const MetaText = styled.div`
  font-size: 12px;
  color: ${Color.MUTED_GREY};
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
  font-size: 13px;
  color: ${Color.GREY};
  font-weight: 400;
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
          <HorizontalDivider />
          {order.orderProducts.map((orderProduct) => (
            <ProductRow key={orderProduct.id}>
              <ProductText>
                {orderProduct.productName} · {orderProduct.quantity}개
              </ProductText>
              <ProductText>{orderProduct.totalPrice.toLocaleString()}원</ProductText>
            </ProductRow>
          ))}
        </ProductContainer>
      )}
    </Container>
  );
}

export default SessionOrderCard;
