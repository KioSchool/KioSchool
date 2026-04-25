import { useEffect, useRef, useState } from 'react';
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
import AdminWorkspaceOnboarding from '@components/admin/workspace/onboarding/AdminWorkspaceOnboarding';
import { isWorkspaceOnboardingCompleted } from '@utils/onboarding';
import useConfirm from '@hooks/useConfirm';
import { match } from 'ts-pattern';

const ContentContainer = styled.div`
  width: 100%;
  gap: 40px;
  ${rowFlex({ justify: 'center', align: 'start' })}
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
  const { updateWorkspaceOnboarding, fetchWorkspaceAccess } = useAdminWorkspace();
  const workspace = useAtomValue(adminWorkspaceAtom);
  const setSideNavIsOpen = useSetAtom(adminSideNavIsOpenAtom);
  const [isWorkspaceLoading, setIsWorkspaceLoading] = useState(true);
  const [hasWorkspaceAccess, setHasWorkspaceAccess] = useState(false);
  const isAutoCompletingOnboardingRef = useRef(false);
  const { ConfirmModal, confirm } = useConfirm({
    title: '온보딩 과정을 건너뛰시겠습니까?',
    description: '건너뛰면 온보딩 과정을 다시 진행할 수 없습니다.',
    okText: '건너뛰기',
    cancelText: '취소',
  });

  useEffect(() => {
    setSideNavIsOpen(true);
  }, [setSideNavIsOpen, workspaceId]);

  const handleLoadWorkspace = () => {
    setIsWorkspaceLoading(true);
    setHasWorkspaceAccess(false);

    return fetchWorkspaceAccess(workspaceId, workspace.id)
      .then((isAccessibleWorkspace) => {
        setHasWorkspaceAccess(isAccessibleWorkspace);
        return isAccessibleWorkspace;
      })
      .finally(() => {
        setIsWorkspaceLoading(false);
      });
  };

  useEffect(() => {
    handleLoadWorkspace().catch(() => undefined);
  }, [workspaceId]);

  const isOnboardingCompleted = isWorkspaceOnboardingCompleted(workspace);

  useEffect(() => {
    if (
      isWorkspaceLoading ||
      !hasWorkspaceAccess ||
      workspace.id === 0 ||
      !workspace.isOnboarding ||
      !isOnboardingCompleted ||
      isAutoCompletingOnboardingRef.current
    ) {
      return;
    }

    isAutoCompletingOnboardingRef.current = true;

    updateWorkspaceOnboarding(workspace.id, false).finally(() => {
      isAutoCompletingOnboardingRef.current = false;
    });
  }, [hasWorkspaceAccess, isOnboardingCompleted, isWorkspaceLoading, updateWorkspaceOnboarding, workspace.id, workspace.isOnboarding]);

  const handleSkipOnboarding = async () => {
    const userInput = await confirm();
    if (!userInput) return;

    return updateWorkspaceOnboarding(workspace.id, false);
  };

  const isOnboardingVisible = hasWorkspaceAccess && !isWorkspaceLoading && workspace.isOnboarding && !isOnboardingCompleted;
  const pageContent = match({ isWorkspaceLoading, hasWorkspaceAccess, isOnboardingVisible })
    .with({ isWorkspaceLoading: true }, () => <LoadingContainer>워크스페이스 정보를 불러오는 중입니다.</LoadingContainer>)
    .with({ hasWorkspaceAccess: false }, () => <LoadingContainer>워크스페이스 접근 권한을 확인하는 중입니다.</LoadingContainer>)
    .with({ isOnboardingVisible: true }, () => (
      <AdminWorkspaceOnboarding workspace={workspace} onRefreshStatus={handleLoadWorkspace} onSkipOnboarding={handleSkipOnboarding} />
    ))
    .otherwise(() => (
      <>
        <ContentContainer>
          <AdminDashboard />
          <PreviewContainer width={300} height={640} />
        </ContentContainer>
        <AppPopup />
        <AppFaqButton />
      </>
    ));

  return (
    <AppContainer useFlex={colFlex({ justify: 'center', align: 'center' })}>
      <>
        {pageContent}
        <ConfirmModal />
      </>
    </AppContainer>
  );
}

export default AdminWorkspace;
