import AccountInfo from '@components/admin/account/info/AccountInfo';
import AppContainer from '@components/common/container/AppContainer';
import RightSidebarModal from '@components/common/modal/RightSidebarModal';
import TossAccountInfo from '@components/admin/account/info/TossAccountInfo';
import useAdminUser from '@hooks/admin/useAdminUser';
import { colFlex, rowFlex } from '@styles/flexStyles';
import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const AccountContainer = styled.div`
  width: 100%;
  // TODO : 디자인이 생각보다 너무 길어서 자체적으로 줄임
  height: 600px;
  gap: 15px;
  ${rowFlex({ justify: 'space-between' })};
`;

function AdminAccount() {
  const { fetchAdminUser } = useAdminUser();
  const router = useLocation();

  useEffect(() => {
    fetchAdminUser();
  }, []);

  return (
    <AppContainer useFlex={colFlex({ justify: 'center' })} customWidth={'1000px'}>
      <AccountContainer>
        <AccountInfo />
        <TossAccountInfo />
        <RightSidebarModal useExternalControl={{ location: router }} />
      </AccountContainer>
    </AppContainer>
  );
}

export default AdminAccount;
