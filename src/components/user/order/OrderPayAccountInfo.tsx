import AppLabel from '@components/common/label/AppLabel';
import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import React from 'react';

const Container = styled.div`
  width: 100%;
  gap: 5px;
  ${colFlex({ justify: 'center', align: 'center' })}
`;

const TitleContainer = styled.div`
  width: 87%;
  ${rowFlex({ justify: 'space-between', align: 'center' })}
`;

const AccountInfo = styled.div`
  width: 100%;
  font-size: 13px;
  font-weight: 500;
  color: #898989;
  padding: 10px 40px;
  box-sizing: border-box;
  background: ${Color.LIGHT_GREY};
  ${colFlex({ justify: 'center', align: 'center' })}
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

const InfoRow = styled.div`
  width: 100%;
  gap: 5px;
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

const Key = styled.div`
  width: 90px;
  ${rowFlex({ justify: 'end', align: 'center' })}
`;

const Value = styled.div`
  width: 250px;
  ${rowFlex({ justify: 'start', align: 'center' })}
`;

const Divider = styled.span``;

function OrderPayAccountInfo() {
  const dummyAccountInfo = {
    bankName: '국민은행',
    accountNumber: '123-456-789',
    depositor: '홍길동',
  };

  return (
    <Container>
      <TitleContainer>
        <AppLabel size={15}>계좌 정보</AppLabel>
        <CopyButton>계좌 복사하기</CopyButton>
      </TitleContainer>
      <AccountInfo>
        <InfoRow>
          <Key>은행명</Key>
          <Divider>|</Divider>
          <Value>{dummyAccountInfo.bankName}</Value>
        </InfoRow>
        <InfoRow>
          <Key>계좌번호</Key>
          <Divider>|</Divider>
          <Value>{dummyAccountInfo.accountNumber}</Value>
        </InfoRow>
        <InfoRow>
          <Key>예금주</Key>
          <Divider>|</Divider>
          <Value>{dummyAccountInfo.depositor}</Value>
        </InfoRow>
      </AccountInfo>
    </Container>
  );
}

export default OrderPayAccountInfo;
