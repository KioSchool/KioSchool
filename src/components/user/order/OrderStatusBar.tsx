import React from 'react';
import styled from '@emotion/styled';
import AppLabel from '@components/common/label/AppLabel';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { OrderStatus } from '@@types/index';

interface OrderStatusBarProps {
  status: OrderStatus;
}

const Container = styled.div`
  margin-top: 20px;
  padding: 0 20px;
  ${rowFlex({ justify: 'space-between', align: 'center' })}
`;

const CancelContainer = styled.div`
  gap: 5px;
  ${colFlex({ align: 'center' })}
`;

const CurrentStatusLabel = styled(AppLabel)`
  font-weight: 600;
  font-size: 15px;
`;

const OtherStatusLabel = styled(AppLabel)`
  font-weight: 400;
  font-size: 13px;
  color: #6f6f6f;
`;

function OrderStatusBar({ status }: OrderStatusBarProps) {
  if (status === OrderStatus.CANCELLED) {
    return (
      <CancelContainer className={'cancel-container'}>
        <CurrentStatusLabel className={'cancel-status-label'}>주문 취소</CurrentStatusLabel>
      </CancelContainer>
    );
  }

  return (
    <Container>
      {status === OrderStatus.NOT_PAID ? (
        <CurrentStatusLabel className={'current-status-label'}>결제 확인 중</CurrentStatusLabel>
      ) : (
        <OtherStatusLabel className={'other-status-label'}>결제 확인 중</OtherStatusLabel>
      )}
      {'· · ·'}
      {status === OrderStatus.PAID ? (
        <CurrentStatusLabel className={'current-status-label'}>조리중</CurrentStatusLabel>
      ) : (
        <OtherStatusLabel className={'other-status-label'}>조리중</OtherStatusLabel>
      )}
      {'· · ·'}
      {status === OrderStatus.SERVED ? (
        <CurrentStatusLabel className={'current-status-label'}>서빙 완료</CurrentStatusLabel>
      ) : (
        <OtherStatusLabel className={'other-status-label'}>서빙 완료</OtherStatusLabel>
      )}
    </Container>
  );
}

export default OrderStatusBar;
