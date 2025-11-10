import AccountInfo from '@components/admin/account/info/AccountInfo';
import RegisterAccount from '@components/admin/account/register/RegisterAccount';
// import RegisterTossAccount from '@components/admin/account/RegisterTossAccount';
import AppContainer from '@components/common/container/AppContainer';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { useEffect } from 'react';
import styled from '@emotion/styled';
import useAdminUser from '@hooks/admin/useAdminUser';
import TossAccountInfo from '@components/admin/account/info/TossAccountInfo';
import { adminUserAtom, isRegisterAccountModalOpenAtom } from 'src/jotai/admin/atoms';
import { useAtomValue, useAtom } from 'jotai';
import RightSidebarModal from '@components/common/modal/RightSidebarModal';

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

  const handleRegisterAccountOpenModal = () => setIsRegisterAccountModalOpen(true);
  const handleRegisterAccountCloseModal = () => setIsRegisterAccountModalOpen(false);

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
          title="계좌 등록"
          subtitle="*편집 중 창을 닫지 마세요"
          isOpen={isRegisterAccountModalOpen}
          onClose={handleRegisterAccountCloseModal}
          onOpen={handleRegisterAccountOpenModal}
        >
          <RegisterAccount />
        </RightSidebarModal>
      </AccountContainer>
      {/* todo: account 관련 사이드바로 이전 예정
      <RegisterAccount />
      <RegisterTossAccount /> */}
    </AppContainer>
  );
}

export default AdminAccount;
