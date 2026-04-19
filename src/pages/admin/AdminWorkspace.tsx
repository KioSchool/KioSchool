import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAdminWorkspace from '@hooks/admin/useAdminWorkspace';
import styled from '@emotion/styled';
import AppContainer from '@components/common/container/AppContainer';
import { colFlex, rowFlex } from '@styles/flexStyles';
import PreviewContainer from '@components/common/container/PreviewContainer';
import AppFaqButton from '@components/common/button/AppFaqButton';
import AppPopup from '@components/common/popup/AppPopup';
import { useAtomValue, useSetAtom } from 'jotai';
import { adminSideNavIsOpenAtom, adminWorkspaceAtom } from '@jotai/admin/atoms';
import AdminDashboard from '@components/admin/workspace/dashboard/AdminDashboard';
import { needsWorkspaceOnboarding } from '@utils/onboarding';
import AdminWorkspaceOnboarding from '@components/admin/workspace/onboarding/AdminWorkspaceOnboarding';

const ContentContainer = styled.div`
  width: 100%;
  ${rowFlex({ justify: 'center', align: 'start' })}
  gap: 40px;
`;

const LoadingContainer = styled.div`
  width: 100%;
  min-height: 320px;
  color: #5d6368;
  font-size: 18px;
  ${colFlex({ justify: 'center', align: 'center' })}
`;

function AdminWorkspace() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { fetchWorkspace } = useAdminWorkspace();
  const workspace = useAtomValue(adminWorkspaceAtom);
  const setSideNavIsOpen = useSetAtom(adminSideNavIsOpenAtom);
  const [isWorkspaceLoading, setIsWorkspaceLoading] = useState(true);

  useEffect(() => {
    setIsWorkspaceLoading(true);

    fetchWorkspace(workspaceId).finally(() => {
      setIsWorkspaceLoading(false);
    });
    setSideNavIsOpen(true);
  }, [workspaceId]);

  const isOnboardingVisible = !isWorkspaceLoading && needsWorkspaceOnboarding(workspace);

  return (
    <AppContainer useFlex={colFlex({ justify: 'center', align: 'center' })}>
      <>
        {isWorkspaceLoading ? (
          <LoadingContainer>워크스페이스 정보를 불러오는 중입니다.</LoadingContainer>
        ) : isOnboardingVisible ? (
          <AdminWorkspaceOnboarding workspaceId={workspaceId || ''} />
        ) : (
          <>
            <ContentContainer>
              <AdminDashboard />
              <PreviewContainer width={300} height={640} />
            </ContentContainer>
            <AppPopup />
            <AppFaqButton />
          </>
        )}
      </>
    </AppContainer>
  );
}

export default AdminWorkspace;
