import React from 'react';
import styled from '@emotion/styled';
import { colFlex } from '@styles/flexStyles';
import { Color } from '@resources/colors';
import OrderPayAccountInfo from '@components/user/order/OrderPayAccountInfo';

const Container = styled.div`
  width: 100%;
  gap: 5px;
  ${colFlex({ justify: 'center', align: 'center' })}
`;

const Description = styled.div`
  width: 100%;
  font-size: 13px;
  font-weight: 500;
  color: #898989;
  text-align: center;
  box-sizing: border-box;
  background: ${Color.LIGHT_GREY};
  padding: 10px 40px;
  word-break: keep-all;
  ${colFlex({ justify: 'center', align: 'center' })}
`;

interface OrderPayDescriptionProps {
  isTossPay: boolean;
}

function OrderPayDescription({ isTossPay }: OrderPayDescriptionProps) {
  if (isTossPay) {
    return (
      <Description>
        입력하신 입금자명과 실제 입금자명이 일치하지 않을 경우 결제 확인이 어려울 수 있습니다. 아래 버튼을 클릭하시면 주문이 완료되며, 토스 송금 페이지로
        이동합니다.
      </Description>
    );
  }

  return (
    <Container>
      <Description>
        입력하신 입금자명과 실제 입금자명이 일치하지 않을 경우 결제 확인이 어려울 수 있습니다. 아래 버튼을 클릭하시면 주문이 완료되며, 주문하신 금액에 맞게
        송금해주시면 됩니다.
      </Description>
      <OrderPayAccountInfo />
    </Container>
  );
}

export default OrderPayDescription;
