import useApi from '@hooks/useApi';
import { Workspace } from '@@types/index';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { adminWorkspaceAtom } from '@jotai/admin/atoms';
import { useSetAtom } from 'jotai';
import { ADMIN_ROUTES, getAdminWorkspacePath } from '@constants/routes';

const INVALID_WORKSPACE_ALERT_MESSAGE = '접근할 수 없는 워크스페이스입니다.';

function useAdminWorkspace() {
  const { adminApi } = useApi();
  const setAdminWorkspace = useSetAtom(adminWorkspaceAtom);

  const navigate = useNavigate();

  const updateWorkspaceOnboarding = (workspaceId: number, isOnboarding: boolean) => {
    return adminApi
      .post<Workspace>('/workspace/onboarding', { workspaceId, isOnboarding })
      .then((res) => {
        setAdminWorkspace(res.data);
        return res.data;
      })
      .catch((error) => {
        console.error(error.response.data.message);
        throw error;
      });
  };

  const fetchWorkspace = (workspaceId: string | undefined | null) => {
    if (!workspaceId) return Promise.resolve(undefined);

    return adminApi
      .get<Workspace>('/workspace', { params: { workspaceId } })
      .then((res) => {
        setAdminWorkspace(res.data);
        return res.data;
      })
      .catch((error) => {
        console.error(error.response.data.message);
        throw error;
      });
  };

  const fetchWorkspaceAccess = (workspaceId: string | undefined | null, fallbackWorkspaceId?: number) => {
    if (!workspaceId) {
      navigate(ADMIN_ROUTES.HOME, { replace: true });
      return Promise.resolve(false);
    }

    return fetchWorkspace(workspaceId)
      .then((loadedWorkspace) => !!loadedWorkspace && String(loadedWorkspace.id) === workspaceId)
      .catch((error: AxiosError) => {
        if (error.response?.status === 405) {
          const fallbackPath =
            fallbackWorkspaceId && String(fallbackWorkspaceId) !== workspaceId ? getAdminWorkspacePath(fallbackWorkspaceId) : ADMIN_ROUTES.HOME;

          alert(INVALID_WORKSPACE_ALERT_MESSAGE);
          navigate(fallbackPath, { replace: true });
          return false;
        }

        return false;
      });
  };

  const updateWorkspaceTableCount = (workspaceId: string | undefined | null, tableCount: number) => {
    return adminApi
      .post<Workspace>('/workspace/table-count', { workspaceId, tableCount })
      .then((res) => {
        setAdminWorkspace(res.data);
      })
      .catch(() => Promise.reject());
  };

  const updateWorkspaceOrderSetting = (workspaceId: string | undefined | null, useOrderSessionTimeLimit: boolean, orderSessionTimeLimitMinutes: number) => {
    return adminApi
      .put<Workspace>('/workspace/setting/order', {
        workspaceId: workspaceId,
        useOrderSessionTimeLimit,
        orderSessionTimeLimitMinutes,
      })
      .then((res) => {
        setAdminWorkspace(res.data);
      })
      .catch(() => Promise.reject());
  };

  const updateWorkspaceInfo = (workspaceId: number, name: string, description: string, notice?: string) => {
    return adminApi.put<Workspace>('/workspace/info', {
      workspaceId,
      name,
      description,
      notice,
    });
  };

  const createFormData = (parameter: any, files: Array<File | null>) => {
    const data = new FormData();
    data.append('body', new Blob([JSON.stringify(parameter)], { type: 'application/json' }));

    files.forEach((file) => {
      if (file) {
        data.append('imageFiles', file, file.name);
      }
    });

    return data;
  };

  const updateWorkspaceImage = (workspaceId: number, imageIds: Array<number | null>, imageFiles: Array<File | null>) => {
    const data = createFormData({ workspaceId, imageIds }, imageFiles);

    return adminApi.put<Workspace>('/workspace/image', data);
  };

  const updateWorkspaceInfoAndImage = (
    workspaceId: number,
    name: string,
    description: string,
    notice: string | undefined,
    imageIds: Array<number | null>,
    imageFiles: Array<File | null>,
  ) => {
    const updateWorkspaceInfoResult = updateWorkspaceInfo(workspaceId, name, description, notice);
    const updateWorkspaceImageResult = updateWorkspaceImage(workspaceId, imageIds, imageFiles);

    Promise.all([updateWorkspaceInfoResult, updateWorkspaceImageResult])
      .then(([infoResponse]) => {
        setAdminWorkspace(infoResponse.data);
        navigate(getAdminWorkspacePath(workspaceId));
      })
      .catch((error) => {
        console.error(error.response.data.message);
      });
  };

  const fetchWorkspaceTables = (workspaceId: string | undefined | null) => adminApi.get(`/workspace/tables`, { params: { workspaceId } });

  const updateWorkspaceMemo = (workspaceId: number, memo: string) => {
    return adminApi.put<Workspace>('/workspace/memo', { workspaceId, memo }).then((res) => {
      setAdminWorkspace(res.data);
    });
  };

  return {
    fetchWorkspace,
    fetchWorkspaceAccess,
    updateWorkspaceTableCount,
    updateWorkspaceOrderSetting,
    updateWorkspaceInfoAndImage,
    updateWorkspaceOnboarding,
    fetchWorkspaceTables,
    updateWorkspaceMemo,
  };
}

export default useAdminWorkspace;
