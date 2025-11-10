import AccountInfo from '@components/admin/account/info/AccountInfo';
import RegisterAccount from '@components/admin/account/register/RegisterAccount';
import RegisterTossAccount from '@components/admin/account/register/RegisterTossAccount';
import AppContainer from '@components/common/container/AppContainer';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { useEffect } from 'react';
import styled from '@emotion/styled';
import useAdminUser from '@hooks/admin/useAdminUser';
import TossAccountInfo from '@components/admin/account/info/TossAccountInfo';
import { activeAdminSidebarAtom, adminUserAtom } from 'src/jotai/admin/atoms';
import { useAtomValue, useAtom } from 'jotai';
import RightSidebarModal from '@components/common/modal/RightSidebarModal';
import { ACCOUNT_MODAL, TOSS_MODAL } from '@constants/data/accountData';

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

  const [activeSidebar, setActiveSidebar] = useAtom(activeAdminSidebarAtom);

  const handleCloseModal = () => setActiveSidebar(null);

  useEffect(() => {
    fetchAdminUser();
  }, []);

  let modalTitle = '';
  let modalSubtitle = '';
  let modalContent: React.ReactNode = null;

  if (activeSidebar === 'REGISTER_ACCOUNT') {
    modalTitle = ACCOUNT_MODAL.TITLE;
    modalSubtitle = ACCOUNT_MODAL.SUBTITLE;
    modalContent = <RegisterAccount />;
  } else if (activeSidebar === 'REGISTER_TOSS') {
    modalTitle = TOSS_MODAL.TITLE;
    modalSubtitle = TOSS_MODAL.SUBTITLE;
    modalContent = <RegisterTossAccount />;
  }

  return (
    <AppContainer
      useFlex={colFlex({ justify: 'center' })}
      customWidth={'1000px'}
      titleNavBarProps={{ title: `${user.name}님의 마이페이지`, subTitle: '계좌관리' }}
    >
      <AccountContainer>
        <AccountInfo />
        <TossAccountInfo />

        <RightSidebarModal title={modalTitle} subtitle={modalSubtitle} isOpen={activeSidebar !== null} onClose={handleCloseModal}>
          {modalContent}
        </RightSidebarModal>
      </AccountContainer>
    </AppContainer>
  );
}

export default AdminAccount;
