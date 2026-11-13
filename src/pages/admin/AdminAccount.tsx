import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import styled from '@emotion/styled';
import AppContainer from '@components/common/container/AppContainer';
import RightSidebarModal from '@components/common/modal/RightSidebarModal';
import AccountCards from '@components/admin/account/AccountCards';
import PayPreviewPanel from '@components/admin/account/PayPreviewPanel';
import useAdminUser from '@hooks/admin/useAdminUser';
import { adminUserAtom } from '@jotai/admin/atoms';
import { colFlex } from '@styles/flexStyles';

const Content = styled.div`
  width: 100%;
  gap: 20px;
  ${colFlex({ align: 'stretch' })}
`;

function AdminAccount() {
  const { fetchAdminUser } = useAdminUser();
  const router = useLocation();
  const account = useAtomValue(adminUserAtom).account;

  useEffect(() => {
    fetchAdminUser();
  }, []);

  return (
    <AppContainer useFlex={colFlex({ justify: 'center' })} customWidth={'1000px'}>
      <Content>
        <AccountCards account={account} />
        <PayPreviewPanel account={account} />
        <RightSidebarModal useExternalControl={{ location: router }} />
      </Content>
    </AppContainer>
  );
}

export default AdminAccount;
