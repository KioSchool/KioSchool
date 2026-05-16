import { useCallback } from 'react';
import { PaginationResponse, Workspace, WorkspaceAdminDetail } from '@@types/index';
import { defaultPaginationValue } from '@@types/defaultValues';
import useApi from '@hooks/useApi';

interface FetchAllWorkspacesParamsType {
  page: number;
  size: number;
  name?: string;
  updatedAfter?: string;
}

function useSuperAdminWorkspace() {
  const { superAdminApi } = useApi();

  const fetchAllWorkspaces = useCallback(
    (page: number, size: number, name?: string, updatedAfter?: string) => {
      const params: FetchAllWorkspacesParamsType = { page, size, name, updatedAfter };
      return superAdminApi
        .get<PaginationResponse<Workspace>>('/workspaces', { params })
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
    (workspaceId: number): Promise<WorkspaceAdminDetail | null> => {
      return superAdminApi
        .delete<WorkspaceAdminDetail>('/workspace', { data: { workspaceId } })
        .then((res) => res.data)
        .catch((error) => {
          console.error(error);
          return null;
        });
    },
    [superAdminApi],
  );

  const changeWorkspaceOwner = useCallback(
    (workspaceId: number, newOwnerLoginId: string): Promise<WorkspaceAdminDetail | null> => {
      return superAdminApi
        .put<WorkspaceAdminDetail>('/workspace/owner', { workspaceId, newOwnerLoginId })
        .then((res) => res.data)
        .catch((error) => {
          console.error(error);
          return null;
        });
    },
    [superAdminApi],
  );

  return { fetchAllWorkspaces, fetchWorkspaceDetail, forceDeleteWorkspace, changeWorkspaceOwner };
}

export default useSuperAdminWorkspace;
