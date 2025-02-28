import React from 'react';
import styled from '@emotion/styled';
import AppButton from '@components/common/button/AppButton';
import { rowFlex } from '@styles/flexStyles';
import { Color } from '@resources/colors';

const Container = styled.div`
  position: fixed;
  bottom: 50px;
  width: 100vw;
  height: 50px;
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

const OrderButtonSubContainer = styled.div`
  padding: 10px;
  border-radius: 20px;
  background: ${Color.WHITE};
  box-shadow: 0 16px 32px 0 rgba(194, 191, 172, 0.6);
`;

interface OrderButtonProps {
  showButton: boolean;
  buttonLabel: string;
  onClick?: () => void;
}

function OrderButton({ showButton, buttonLabel, onClick }: OrderButtonProps) {
  if (!showButton) return null;

  return (
    <Container className={'order-button-container'}>
      <OrderButtonSubContainer className={'order-button-sub-container'}>
        <AppButton size={290} onClick={onClick}>
          {buttonLabel}
        </AppButton>
      </OrderButtonSubContainer>
    </Container>
  );
}

export default OrderButton;
