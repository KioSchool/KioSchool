import useApi from '@hooks/useApi';
import { FocalPoint, Workspace } from '@@types/index';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { adminTablesAtom, adminWorkspaceAtom } from '@jotai/admin/atoms';
import { useSetAtom } from 'jotai';
import { ADMIN_ROUTES, getAdminWorkspacePath } from '@constants/routes';
import { API_ERROR_CODES } from '@constants/errorCodes';
import { isApiErrorCode } from '@utils/apiError';

const INVALID_WORKSPACE_ALERT_MESSAGE = '접근할 수 없는 워크스페이스입니다.';

function useAdminWorkspace() {
  const { adminApi } = useApi();
  const setAdminWorkspace = useSetAtom(adminWorkspaceAtom);
  const setAdminTables = useSetAtom(adminTablesAtom);

  const navigate = useNavigate();

  const updateWorkspaceOnboarding = (workspaceId: number, isOnboarding: boolean) => {
    return adminApi
      .post<Workspace>('/workspace/onboarding', { workspaceId, isOnboarding })
      .then((res) => {
        setAdminWorkspace(res.data);
        return res.data;
      })
      .catch((error) => {
        toast.error(error.response?.data?.message ?? '온보딩 상태 변경에 실패했어요.');
        console.error(error);
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
        toast.error(error.response?.data?.message ?? '워크스페이스 정보를 불러오지 못했어요.');
        console.error(error);
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
      .catch((error: unknown) => {
        // 405는 카테고리 삭제 불가(CANNOT_DELETE_USING_PRODUCT_CATEGORY)와도 겹치므로 code로 판정한다.
        if (isApiErrorCode(error, API_ERROR_CODES.WORKSPACE_INACCESSIBLE)) {
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

  const createFormData = (parameter: any, files: Array<File>) => {
    const data = new FormData();
    data.append('body', new Blob([JSON.stringify(parameter)], { type: 'application/json' }));

    files.forEach((file) => {
      data.append('imageFiles', file, file.name);
    });

    return data;
  };

  const updateWorkspaceImage = (workspaceId: number, imageIds: Array<number | null>, focalPoints: Array<FocalPoint>, imageFiles: Array<File>) => {
    const data = createFormData({ workspaceId, imageIds, focalPoints }, imageFiles);

    return adminApi.put<Workspace>('/workspace/image', data);
  };

  const updateWorkspaceInfoAndImage = (
    workspaceId: number,
    name: string,
    description: string,
    notice: string | undefined,
    imageIds: Array<number | null>,
    focalPoints: Array<FocalPoint>,
    imageFiles: Array<File>,
  ) => {
    // 이미지 업데이트가 워크스페이스를 다시 읽고 저장하므로, 정보 저장이 먼저 커밋되어야
    // 이미지 저장이 그 결과를 덮어쓰지 않는다. 이미지 응답이 최종 상태다 — 정보 응답은 버린다.
    updateWorkspaceInfo(workspaceId, name, description, notice)
      .then(() => updateWorkspaceImage(workspaceId, imageIds, focalPoints, imageFiles))
      .then((imageResponse) => {
        setAdminWorkspace(imageResponse.data);
        navigate(getAdminWorkspacePath(workspaceId));
      })
      .catch((error) => {
        toast.error(error.response?.data?.message ?? '워크스페이스 저장에 실패했어요. 잠시 후 다시 시도해주세요.');
        console.error(error);
      });
  };

  const fetchWorkspaceTables = (workspaceId: string | undefined | null) =>
    adminApi.get(`/workspace/tables`, { params: { workspaceId } }).then((res) => setAdminTables(res.data));

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
