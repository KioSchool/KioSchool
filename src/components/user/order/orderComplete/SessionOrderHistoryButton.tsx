import styled from '@emotion/styled';
import { RiArrowRightSLine } from '@remixicon/react';
import { Order } from '@@types/index';
import { Color } from '@resources/colors';
import { rowFlex } from '@styles/flexStyles';
import { getSessionOrderTotalPrice } from '@utils/sessionOrder';

const MIN_ORDER_COUNT_TO_SHOW = 2;

const Container = styled.button`
  box-sizing: border-box;
  width: 100%;
  padding: 14px 20px;
  border-radius: 9px;
  border: 0.5px solid #939393;
  background: ${Color.WHITE};
  color: inherit;
  font: inherit;
  cursor: pointer;
  ${rowFlex({ justify: 'space-between', align: 'center' })}
`;

const TitleText = styled.div`
  font-size: 14px;
  font-weight: 600;
`;

const SummaryContainer = styled.div`
  gap: 4px;
  ${rowFlex({ align: 'center' })}
`;

const TotalText = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: ${Color.GREY};
`;

const ArrowIcon = styled(RiArrowRightSLine)`
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  fill: ${Color.MUTED_GREY};
`;

interface SessionOrderHistoryButtonProps {
  orders: Order[];
  onClick: () => void;
}

function SessionOrderHistoryButton({ orders, onClick }: SessionOrderHistoryButtonProps) {
  if (orders.length < MIN_ORDER_COUNT_TO_SHOW) return null;

  const totalPrice = getSessionOrderTotalPrice(orders);

  return (
    <Container type="button" onClick={onClick}>
      <TitleText>테이블 주문 내역 {orders.length}건</TitleText>
      <SummaryContainer>
        {totalPrice > 0 && <TotalText>합계 {totalPrice.toLocaleString()}원</TotalText>}
        <ArrowIcon />
      </SummaryContainer>
    </Container>
  );
}

export default SessionOrderHistoryButton;
