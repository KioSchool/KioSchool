import { useEffect } from 'react';
import useAdminUser from '@hooks/admin/useAdminUser';
import AppContainer from '@components/common/container/AppContainer';
import AddWorkspace from '@components/common/workspace/AddWorkspace';
import WorkspaceContent from '@components/admin/workspace/WorkspaceContent';
import HomeOnboarding from '@components/admin/home/HomeOnboarding';
import AppPopup from '@components/common/popup/AppPopup';
import { PopupData } from '@constants/data/popupData';
import { colFlex } from '@styles/flexStyles';
import { useAtomValue } from 'jotai';
import { adminUserAtom, adminWorkspacesAtom } from '@jotai/admin/atoms';
import AppFaqButton from '@components/common/button/AppFaqButton';
import styled from '@emotion/styled';
import OrderQRNoticePopupContent from '@components/admin/home/OrderQRNoticePopupContent';

const Container = styled.div`
  width: 95%;
  ${colFlex({ align: 'center' })}
`;

const ADMIN_HOME_POPUP_DATAS: PopupData[] = [
  {
    popupId: 0,
    title: 'Default Popup for prevent flickering',
    expireDate: new Date(1000, 1, 1),
    children: null,
  },
  {
    popupId: 2,
    title: '주문 QR 코드 재다운로드 안내',
    expireDate: new Date(2026, 5, 5),
    children: <OrderQRNoticePopupContent />,
  },
];

function AdminHome() {
  const { fetchWorkspaces, fetchAdminUser } = useAdminUser();
  const workspaces = useAtomValue(adminWorkspacesAtom);
  const user = useAtomValue(adminUserAtom);
  const addWorkspaceNumber = 3 - workspaces.length;
  const isAccountRegistered = !!user.account?.accountNumber;

  useEffect(() => {
    fetchWorkspaces();
    fetchAdminUser();
  }, []);

  const pageContent = !isAccountRegistered ? (
    <HomeOnboarding />
  ) : (
    <Container>
      <WorkspaceContent workspaces={workspaces}>
        {Array.from({ length: addWorkspaceNumber }).map((_, i) => (
          <AddWorkspace key={i} workspaces={workspaces} />
        ))}
      </WorkspaceContent>
      <AppFaqButton />
    </Container>
  );

  return (
    <AppContainer useFlex={colFlex({ justify: 'center', align: 'center' })} customGap={'30px'}>
      <>
        {pageContent}
        <AppPopup popupDatas={ADMIN_HOME_POPUP_DATAS} />
      </>
    </AppContainer>
  );
}

export default AdminHome;
