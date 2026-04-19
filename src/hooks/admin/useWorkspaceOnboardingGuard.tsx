import { useEffect } from 'react';
import { useAtomValue } from 'jotai';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { adminWorkspaceAtom } from '@jotai/admin/atoms';
import { getAdminWorkspacePath } from '@constants/routes';
import { needsWorkspaceOnboarding } from '@utils/onboarding';
import useAdminWorkspace from './useAdminWorkspace';

function useWorkspaceOnboardingGuard() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const workspace = useAtomValue(adminWorkspaceAtom);
  const { fetchWorkspace } = useAdminWorkspace();

  useEffect(() => {
    if (!workspaceId) {
      return;
    }

    fetchWorkspace(workspaceId)
      .then((fetchedWorkspace) => {
        const workspacePath = getAdminWorkspacePath(workspaceId);

        if (!fetchedWorkspace || location.pathname === workspacePath) {
          return;
        }

        if (needsWorkspaceOnboarding(fetchedWorkspace)) {
          navigate(workspacePath, { replace: true });
        }
      })
      .catch(() => undefined);
  }, [location.pathname, workspaceId]);

  useEffect(() => {
    if (!workspaceId) {
      return;
    }

    const workspacePath = getAdminWorkspacePath(workspaceId);

    if (location.pathname === workspacePath) {
      return;
    }

    if (workspace.id === Number(workspaceId) && needsWorkspaceOnboarding(workspace)) {
      navigate(workspacePath, { replace: true });
    }
  }, [location.pathname, navigate, workspace, workspaceId]);
}

export default useWorkspaceOnboardingGuard;
