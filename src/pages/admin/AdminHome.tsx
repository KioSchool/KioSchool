import { useEffect, useState } from 'react';
import useAdminUser from '@hooks/admin/useAdminUser';
import AppContainer from '@components/common/container/AppContainer';
import AddWorkspace from '@components/common/workspace/AddWorkspace';
import WorkspaceContent from '@components/admin/workspace/WorkspaceContent';
import HomeOnboarding from '@components/admin/home/HomeOnboarding';
import AppPopup from '@components/common/popup/AppPopup';
import { POPUP_CLOSE_MODE, PopupData } from '@constants/data/popupData';
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

const LoadingContainer = styled.div`
  width: 100%;
  min-height: 320px;
  color: #5d6368;
  font-size: 18px;
  ${colFlex({ justify: 'center', align: 'center' })}
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
    closeMode: POPUP_CLOSE_MODE.FOREVER,
    closeText: '다시 보지 않기',
  },
];

function AdminHome() {
  const { fetchWorkspaces, fetchAdminUser } = useAdminUser();
  const workspaces = useAtomValue(adminWorkspacesAtom);
  const user = useAtomValue(adminUserAtom);
  const [isAdminUserLoading, setIsAdminUserLoading] = useState(true);
  const addWorkspaceNumber = 3 - workspaces.length;
  const isAccountRegistered = !!user.account?.accountNumber;

  useEffect(() => {
    fetchWorkspaces();
    fetchAdminUser().finally(() => {
      setIsAdminUserLoading(false);
    });
  }, []);

  const pageContent = isAdminUserLoading ? (
    <LoadingContainer>계정 정보를 불러오는 중입니다.</LoadingContainer>
  ) : !isAccountRegistered ? (
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
