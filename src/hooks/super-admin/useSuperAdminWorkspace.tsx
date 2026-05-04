import { PaginationResponse, Workspace, WorkspaceAdminDetail } from '@@types/index';
import { defaultPaginationValue } from '@@types/defaultValues';
import useApi from '@hooks/useApi';

interface FetchAllWorkspacesParamsType {
  page: number;
  size: number;
  name?: string;
}

function useSuperAdminWorkspace() {
  const { superAdminApi } = useApi();

  const fetchAllWorkspaces = (page: number, size: number, name?: string) => {
    const params: FetchAllWorkspacesParamsType = { page, size, name };

    return superAdminApi
      .get<PaginationResponse<Workspace>>('/workspaces', { params })
      .then((res) => res.data)
      .catch((error) => {
        console.error(error);
        return defaultPaginationValue;
      });
  };

  const fetchWorkspaceDetail = (workspaceId: number): Promise<WorkspaceAdminDetail | null> => {
    return superAdminApi
      .get<WorkspaceAdminDetail>('/workspace', { params: { workspaceId } })
      .then((res) => res.data)
      .catch((error) => {
        console.error(error);
        return null;
      });
  };

  const forceDeleteWorkspace = (workspaceId: number): Promise<WorkspaceAdminDetail | null> => {
    return superAdminApi
      .delete<WorkspaceAdminDetail>('/workspace', { data: { workspaceId } })
      .then((res) => res.data)
      .catch((error) => {
        console.error(error);
        return null;
      });
  };

  const changeWorkspaceOwner = (workspaceId: number, newOwnerLoginId: string): Promise<WorkspaceAdminDetail | null> => {
    return superAdminApi
      .put<WorkspaceAdminDetail>('/workspace/owner', { workspaceId, newOwnerLoginId })
      .then((res) => res.data)
      .catch((error) => {
        console.error(error);
        return null;
      });
  };

  return { fetchAllWorkspaces, fetchWorkspaceDetail, forceDeleteWorkspace, changeWorkspaceOwner };
}

export default useSuperAdminWorkspace;
