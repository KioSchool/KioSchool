import useAdminUser from '@hooks/admin/useAdminUser';
import { adminUserAccountAtomSelector } from '@recoils/atoms';
import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import styled from '@emotion/styled';
import { colFlex, rowFlex } from '@styles/flexStyles';
import AppLabel from '@components/common/label/AppLabel';
import { Color } from '@resources/colors';

const Container = styled.div`
  width: 100%;
  ${rowFlex({ justify: 'start', align: 'center' })};
`;

const AccountInfoContainer = styled.div`
  width: 350px;
  gap: 10px;
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
  const { fetchAdminUser } = useAdminUser();
  const accountInfo = useRecoilValue(adminUserAccountAtomSelector);

  useEffect(() => {
    fetchAdminUser();
  }, []);

  const { bankName, accountNumber, accountHolder } = accountInfo;

  return (
    <Container>
      <AccountInfoContainer>
        <AppLabel size={15} color={Color.BLACK} style={{ fontWeight: 500 }}>
          등록된 계좌
        </AppLabel>
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
