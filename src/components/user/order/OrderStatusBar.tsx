import styled from '@emotion/styled';
import { rowFlex } from '@styles/flexStyles';
import { OrderStatus } from '@@types/index';
import { Color } from '@resources/colors';

interface OrderStatusBarProps {
  status: OrderStatus;
}

const Container = styled.div`
  width: 100%;
  ${rowFlex({ justify: 'space-between' })}
`;

const OrderStatusText = styled.div<{ active: boolean }>`
  font-size: 13px;
  font-weight: 500;
  color: ${({ active }) => (active ? Color.BLACK : '#898989')};
`;

const CancelContainer = styled.div`
  width: 100%;
  ${rowFlex({ justify: 'center' })};
`;

const CancelText = styled.div`
  font-size: 13px;
  font-weight: 500;
  color: ${Color.KIO_ORANGE};
`;

function OrderStatusBar({ status }: OrderStatusBarProps) {
  if (status === OrderStatus.CANCELLED) {
    return (
      <CancelContainer>
        <CancelText>취소된 주문입니다.</CancelText>
      </CancelContainer>
    );
  }

  return (
    <Container>
      <OrderStatusText active={status === OrderStatus.NOT_PAID}>결제대기</OrderStatusText>
      <OrderStatusText active={false}> {'· · ·'}</OrderStatusText>
      <OrderStatusText active={status === OrderStatus.PAID}>조리중</OrderStatusText>
      <OrderStatusText active={false}> {'· · ·'}</OrderStatusText>
      <OrderStatusText active={status === OrderStatus.SERVED}>서빙완료</OrderStatusText>
    </Container>
  );
}

export default OrderStatusBar;
