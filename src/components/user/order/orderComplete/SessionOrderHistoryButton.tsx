import styled from '@emotion/styled';
import { RiArrowRightSLine } from '@remixicon/react';
import { Order } from '@@types/index';
import { Color } from '@resources/colors';
import { rowFlex } from '@styles/flexStyles';

const MIN_ORDER_COUNT_TO_SHOW = 2;

const Container = styled.button`
  padding: 0 10px 0 0;
  border: none;
  background: none;
  color: ${Color.GREY};
  font: inherit;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  ${rowFlex({ align: 'center' })}
`;

const ArrowIcon = styled(RiArrowRightSLine)`
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  fill: ${Color.GREY};
`;

interface SessionOrderHistoryButtonProps {
  orders: Order[];
  onClick: () => void;
}

function SessionOrderHistoryButton({ orders, onClick }: SessionOrderHistoryButtonProps) {
  if (orders.length < MIN_ORDER_COUNT_TO_SHOW) return null;

  return (
    <Container type="button" onClick={onClick}>
      테이블 주문 내역 {orders.length}건
      <ArrowIcon />
    </Container>
  );
}

export default SessionOrderHistoryButton;
