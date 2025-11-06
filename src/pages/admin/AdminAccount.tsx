import AccountInfo from '@components/admin/account/AccountInfo';
// import RegisterAccount from '@components/admin/account/RegisterAccount';
// import RegisterTossAccount from '@components/admin/account/RegisterTossAccount';
import AppContainer from '@components/common/container/AppContainer';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { useEffect } from 'react';
import styled from '@emotion/styled';
import useAdminUser from '@hooks/admin/useAdminUser';
import TossAccountInfo from '@components/admin/account/TossAccountInfo';
import { adminUserAtom } from 'src/jotai/admin/atoms';
import { useAtomValue } from 'jotai';

const AccountContainer = styled.div`
  width: 100%;
  // TODO : 디자인이 생각보다 너무 길어서 자체적으로 줄임
  height: 600px;
  gap: 15px;
  ${rowFlex({ justify: 'space-between' })};
`;

function AdminAccount() {
  const { fetchAdminUser } = useAdminUser();
  const user = useAtomValue(adminUserAtom);

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
        <AccountInfo />
        <TossAccountInfo />
      </AccountContainer>
      {/* <RegisterAccount />
      <RegisterTossAccount /> */}
    </AppContainer>
  );
}

export default AdminAccount;
