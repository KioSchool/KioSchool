import { adminUserAccountAtomSelector } from '@recoils/atoms';
import React from 'react';
import { useRecoilValue } from 'recoil';
import styled from '@emotion/styled';
import { colFlex, rowFlex } from '@styles/flexStyles';
import AppLabel from '@components/common/label/AppLabel';
import { Color } from '@resources/colors';

const Container = styled.div`
  width: 70%;
  ${rowFlex({ justify: 'start', align: 'center' })};
`;

const AccountInfoContainer = styled.div`
  width: 350px;
  gap: 25px;
  ${colFlex({ justify: 'start', align: 'start' })};
`;

const TextContainer = styled.div`
  ${colFlex({ align: 'start' })};
  gap: 12px;
`;

const AccountInfoRow = styled.div`
  display: grid;
  column-gap: 40px;
  grid-template-columns: 60px 1fr;
`;

function AccountInfo() {
  const accountInfo = useRecoilValue(adminUserAccountAtomSelector);

  const { bankName, accountNumber, accountHolder } = accountInfo;

  return (
    <Container>
      <AccountInfoContainer>
        <TextContainer>
          <AccountInfoRow>
            <AppLabel size={13} color={Color.BLACK} style={{ fontWeight: 500 }}>
              은행명
            </AppLabel>
            <AppLabel size={13} style={{ fontWeight: 400 }}>
              {bankName}
            </AppLabel>
          </AccountInfoRow>
          <AccountInfoRow>
            <AppLabel size={13} color={Color.BLACK} style={{ fontWeight: 500 }}>
              예금주
            </AppLabel>
            <AppLabel size={13} style={{ fontWeight: 400 }}>
              {accountHolder}
            </AppLabel>
          </AccountInfoRow>
          <AccountInfoRow>
            <AppLabel size={13} color={Color.BLACK} style={{ fontWeight: 500 }}>
              계좌번호
            </AppLabel>
            <AppLabel size={13} style={{ fontWeight: 400 }}>
              {accountNumber}
            </AppLabel>
          </AccountInfoRow>
        </TextContainer>
      </AccountInfoContainer>
    </Container>
  );
}

export default AccountInfo;
