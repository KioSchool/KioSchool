import React from 'react';
import styled from '@emotion/styled';
import AppLabel from '@components/common/label/AppLabel';

interface OrderStatusBarProps {
  status: string;
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  padding: 0 20px;
`;

const CancelContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
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
  if (status === 'CANCELLED') {
    return (
      <CancelContainer>
        <CurrentStatusLabel>주문 취소</CurrentStatusLabel>
      </CancelContainer>
    );
  }

  return (
    <Container>
      {status === 'NOT_PAID' ? <CurrentStatusLabel>결제 확인 중</CurrentStatusLabel> : <OtherStatusLabel>결제 확인 중</OtherStatusLabel>}
      {'· · ·'}
      {status === 'PAID' ? <CurrentStatusLabel>조리중</CurrentStatusLabel> : <OtherStatusLabel>조리중</OtherStatusLabel>}
      {'· · ·'}
      {status === 'SERVED' ? <CurrentStatusLabel>서빙 완료</CurrentStatusLabel> : <OtherStatusLabel>서빙 완료</OtherStatusLabel>}
    </Container>
  );
}

export default OrderStatusBar;
