import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { Workspace } from '@@types/index';
import useAdminWorkspace from '@hooks/admin/useAdminWorkspace';
import { adminWorkspaceAtom } from '@jotai/admin/atoms';
import { ADMIN_ROUTES, getAdminWorkspacePath } from '@constants/routes';

const INVALID_WORKSPACE_ALERT_MESSAGE = '접근할 수 없는 워크스페이스입니다.';

function useAdminWorkspaceAccess(workspaceId: string | undefined) {
  const navigate = useNavigate();
  const workspace = useAtomValue(adminWorkspaceAtom);
  const { fetchWorkspace } = useAdminWorkspace();
  const [isWorkspaceLoading, setIsWorkspaceLoading] = useState(true);
  const [hasWorkspaceAccess, setHasWorkspaceAccess] = useState(false);

  const getFallbackPath = () => {
    if (workspace.id > 0 && String(workspace.id) !== workspaceId) {
      return getAdminWorkspacePath(workspace.id);
    }

    return ADMIN_ROUTES.HOME;
  };

  const handleWorkspaceAccessError = (error: AxiosError) => {
    if (error.response?.status === 405) {
      alert(INVALID_WORKSPACE_ALERT_MESSAGE);
      navigate(getFallbackPath(), { replace: true });
      return;
    }

    setHasWorkspaceAccess(false);
  };

  const loadWorkspaceAccess = () => {
    if (!workspaceId) {
      setHasWorkspaceAccess(false);
      setIsWorkspaceLoading(false);
      navigate(ADMIN_ROUTES.HOME, { replace: true });
      return Promise.resolve(undefined);
    }

    setIsWorkspaceLoading(true);
    setHasWorkspaceAccess(false);

    return fetchWorkspace(workspaceId)
      .then((loadedWorkspace) => {
        const isAccessibleWorkspace = !!loadedWorkspace && String(loadedWorkspace.id) === workspaceId;
        setHasWorkspaceAccess(isAccessibleWorkspace);
        return loadedWorkspace;
      })
      .catch((error: AxiosError<Workspace>) => {
        handleWorkspaceAccessError(error);
        throw error;
      })
      .finally(() => {
        setIsWorkspaceLoading(false);
      });
  };

  useEffect(() => {
    loadWorkspaceAccess().catch(() => undefined);
  }, [workspaceId]);

  return {
    isWorkspaceLoading,
    hasWorkspaceAccess,
    refreshWorkspaceAccess: loadWorkspaceAccess,
  };
}

export default useAdminWorkspaceAccess;
