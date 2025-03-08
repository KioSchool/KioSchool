import AppLabel from '@components/common/label/AppLabel';
import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import React from 'react';

const Container = styled.div`
  width: 100%;
  height: 140px;
  ${colFlex({ justify: 'center', align: 'center' })}
`;

const TitleContainer = styled.div`
  width: 80%;
  height: 30px;
  ${rowFlex({ justify: 'space-between', align: 'center' })}
`;

const AccountInfo = styled.div`
  width: 100%;
  font-size: 13px;
  font-weight: 500;
  color: #898989;
  padding: 0 40px;
  text-align: center;
  box-sizing: border-box;
  background: ${Color.LIGHT_GREY};
`;

const CopyButton = styled.button`
  width: 90px;
  height: 23px;
  font-size: 12px;
  background: ${Color.WHITE};
  border: 1px solid ${Color.GREY};
  border-radius: 20px;
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

function OrderPayAccountInfo() {
  return (
    <Container>
      <TitleContainer>
        <AppLabel size={15}>계좌 정보</AppLabel>
        <CopyButton>계좌 복사하기</CopyButton>
      </TitleContainer>
      <AccountInfo>OrderPayAccountInfo</AccountInfo>
    </Container>
  );
}

export default OrderPayAccountInfo;
