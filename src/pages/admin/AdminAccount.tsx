import AccountInfo from '@components/admin/account/info/AccountInfo';
import RegisterAccount from '@components/admin/account/register/RegisterAccount';
import RegisterTossAccount from '@components/admin/account/register/RegisterTossAccount';
import AppContainer from '@components/common/container/AppContainer';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { useEffect } from 'react';
import styled from '@emotion/styled';
import useAdminUser from '@hooks/admin/useAdminUser';
import TossAccountInfo from '@components/admin/account/info/TossAccountInfo';
import { adminUserAtom, isRegisterAccountModalOpenAtom, isRegisterTossModalOpenAtom } from 'src/jotai/admin/atoms';
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

  const [isRegisterAccountModalOpen, setIsRegisterAccountModalOpen] = useAtom(isRegisterAccountModalOpenAtom);
  const [isRegisterTossModalOpen, setIsRegisterTossModalOpen] = useAtom(isRegisterTossModalOpenAtom);

  const handleRegisterAccountOpenModal = () => setIsRegisterAccountModalOpen(true);
  const handleRegisterAccountCloseModal = () => setIsRegisterAccountModalOpen(false);

  const handleRegisterTossOpenModal = () => setIsRegisterTossModalOpen(true);
  const handleRegisterTossCloseModal = () => setIsRegisterTossModalOpen(false);

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
        <RightSidebarModal
          title={ACCOUNT_MODAL.TITLE}
          subtitle={ACCOUNT_MODAL.SUBTITLE}
          isOpen={isRegisterAccountModalOpen}
          onClose={handleRegisterAccountCloseModal}
          onOpen={handleRegisterAccountOpenModal}
        >
          <RegisterAccount />
        </RightSidebarModal>
        <RightSidebarModal
          title={TOSS_MODAL.TITLE}
          subtitle={TOSS_MODAL.SUBTITLE}
          isOpen={isRegisterTossModalOpen}
          onClose={handleRegisterTossCloseModal}
          onOpen={handleRegisterTossOpenModal}
        >
          <RegisterTossAccount />
        </RightSidebarModal>
      </AccountContainer>
    </AppContainer>
  );
}

export default AdminAccount;
