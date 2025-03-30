import AccountInfo from '@components/admin/account/AccountInfo';
import RegisterAccount from '@components/admin/account/RegisterAccount';
import RegisterTossAccount from '@components/admin/account/RegisterTossAccount';
import AppContainer from '@components/common/container/AppContainer';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { adminUserAtom } from '@recoils/atoms';
import { useEffect } from 'react';
import styled from '@emotion/styled';
import HorizontalDivider from '@components/common/divider/HorizontalDivider';
import useAdminUser from '@hooks/admin/useAdminUser';

const AccountContainer = styled.div`
  width: 100%;
  gap: 40px;
  ${colFlex({ align: 'center' })};
`;

const RegisterContainer = styled.div`
  width: 100%;
  ${rowFlex({ align: 'center' })};
`;

function AdminAccount() {
  const { fetchAdminUser } = useAdminUser();
  const navigate = useNavigate();
  const user = useRecoilValue(adminUserAtom);

  useEffect(() => {
    fetchAdminUser();
  }, []);

  return (
    <AppContainer
      useFlex={colFlex({ justify: 'center' })}
      titleNavBarProps={{ title: `${user.name}님의 마이페이지`, subTitle: '계좌관리', onLeftArrowClick: () => navigate('/admin/my-info') }}
    >
      <AccountContainer>
        <AccountInfo />
        <HorizontalDivider />
        <RegisterContainer>
          <RegisterAccount />
          <RegisterTossAccount />
        </RegisterContainer>
      </AccountContainer>
    </AppContainer>
  );
}

export default AdminAccount;
