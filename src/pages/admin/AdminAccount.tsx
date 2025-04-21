import AccountInfo from '@components/admin/account/AccountInfo';
import RegisterAccount from '@components/admin/account/RegisterAccount';
import RegisterTossAccount from '@components/admin/account/RegisterTossAccount';
import AppContainer from '@components/common/container/AppContainer';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { useRecoilValue } from 'recoil';
import { adminUserAtom } from '@recoils/atoms';
import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import HorizontalDivider from '@components/common/divider/HorizontalDivider';
import useAdminUser from '@hooks/admin/useAdminUser';
import AppLabel from '@components/common/label/AppLabel';
import { Color } from '@resources/colors';
import TossAccountInfo from '@components/admin/account/TossAccountInfo';

const AccountContainer = styled.div`
  width: 100%;
  gap: 25px;
  ${colFlex({ align: 'center' })};
`;

const HeaderContainer = styled.div`
  width: 100%;
  ${rowFlex({ justify: 'space-between' })};
`;

const InfoContainer = styled.div`
  width: 100%;
  gap: 15px;
  ${rowFlex({ justify: 'space-between' })};
`;

const RegisterContainer = styled.div`
  width: 100%;
  gap: 15px;
  ${rowFlex({})};
`;

function AdminAccount() {
  const { fetchAdminUser } = useAdminUser();
  const user = useRecoilValue(adminUserAtom);

  useEffect(() => {
    fetchAdminUser();
  }, []);

  return (
    <AppContainer
      useFlex={colFlex({ justify: 'center' })}
      customWidth={'1000px'}
      titleNavBarProps={{ title: `${user.name}님의 마이페이지`, subTitle: '계좌관리' }}
    >
      <AccountContainer>
        <HeaderContainer>
          <AppLabel size={15} color={Color.BLACK} style={{ fontWeight: 500 }}>
            등록된 계좌
          </AppLabel>
        </HeaderContainer>
        <InfoContainer>
          <AccountInfo />
          <TossAccountInfo />
        </InfoContainer>
        <HorizontalDivider />
        <HeaderContainer>
          <AppLabel size={15} color={Color.BLACK} style={{ fontWeight: 500 }}>
            계좌 등록하기
          </AppLabel>
        </HeaderContainer>
        <RegisterContainer>
          <RegisterAccount />
          <RegisterTossAccount />
        </RegisterContainer>
      </AccountContainer>
    </AppContainer>
  );
}

export default AdminAccount;
