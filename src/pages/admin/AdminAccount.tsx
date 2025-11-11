import AccountInfo from '@components/admin/account/info/AccountInfo';
import AppContainer from '@components/common/container/AppContainer';
import RightSidebarModal from '@components/common/modal/RightSidebarModal';
import TossAccountInfo from '@components/admin/account/info/TossAccountInfo';
import useRightSidebarModalController from '@hooks/useRightSidebarModalController';
import useAdminUser from '@hooks/admin/useAdminUser';
import { colFlex, rowFlex } from '@styles/flexStyles';
import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useAtomValue } from 'jotai';
import { adminUserAtom } from 'src/jotai/admin/atoms';

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
  const { modalProps, open } = useRightSidebarModalController();

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
        <AccountInfo onOpenModal={open} />
        <TossAccountInfo onOpenModal={open} />

        <RightSidebarModal {...modalProps} />
      </AccountContainer>
    </AppContainer>
  );
}

export default AdminAccount;
