import { useCallback } from 'react';
import { PaginationResponse, SuperAdminWorkspace, WorkspaceAdminDetail } from '@@types/index';
import { defaultPaginationValue } from '@@types/defaultValues';
import useApi from '@hooks/useApi';

interface FetchAllWorkspacesParamsType {
  page: number;
  size: number;
  keyword?: string;
  updatedAfter?: string;
}

function useSuperAdminWorkspace() {
  const { superAdminApi } = useApi();

  const fetchAllWorkspaces = useCallback(
    (page: number, size: number, keyword?: string, updatedAfter?: string) => {
      const params: FetchAllWorkspacesParamsType = { page, size, keyword, updatedAfter };
      return superAdminApi
        .get<PaginationResponse<SuperAdminWorkspace>>('/workspaces', { params })
        .then((res) => res.data)
        .catch((error) => {
          console.error(error);
          return defaultPaginationValue;
        });
    },
    [superAdminApi],
  );

  const fetchWorkspaceDetail = useCallback(
    (workspaceId: number): Promise<WorkspaceAdminDetail | null> => {
      return superAdminApi
        .get<WorkspaceAdminDetail>('/workspace', { params: { workspaceId } })
        .then((res) => res.data)
        .catch((error) => {
          console.error(error);
          return null;
        });
    },
    [superAdminApi],
  );

  const forceDeleteWorkspace = useCallback(
    (workspaceId: number): Promise<WorkspaceAdminDetail> => {
      return superAdminApi.delete<WorkspaceAdminDetail>('/workspace', { data: { workspaceId } }).then((res) => res.data);
    },
    [superAdminApi],
  );

  const changeWorkspaceOwner = useCallback(
    (workspaceId: number, newOwnerLoginId: string): Promise<WorkspaceAdminDetail> => {
      return superAdminApi.put<WorkspaceAdminDetail>('/workspace/owner', { workspaceId, newOwnerLoginId }).then((res) => res.data);
    },
    [superAdminApi],
  );

  return { fetchAllWorkspaces, fetchWorkspaceDetail, forceDeleteWorkspace, changeWorkspaceOwner };
}

export default useSuperAdminWorkspace;
