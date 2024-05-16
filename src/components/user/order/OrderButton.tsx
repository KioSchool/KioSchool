import React from 'react';
import styled from '@emotion/styled';
import AppButton from '@components/common/button/AppButton';

interface OrderButtonProps {
  showButton: boolean;
  buttonLabel: string;
  onClick?: () => void;
}

const OrderButtonContainer = styled.div`
  position: fixed;
  bottom: 50px;
  width: 100vw;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const OrderButtonSubContainer = styled.div`
  padding: 8px;
  border-radius: 20px;
  background: white;
  box-shadow: 0 16px 32px 0 rgba(194, 191, 172, 0.6);
`;

function OrderButton({ showButton, buttonLabel, onClick }: OrderButtonProps) {
  if (!showButton) return null;

  return (
    <OrderButtonContainer>
      <OrderButtonSubContainer>
        <AppButton size={270} onClick={onClick}>
          {buttonLabel}
        </AppButton>
      </OrderButtonSubContainer>
    </OrderButtonContainer>
  );
}

export default OrderButton;
