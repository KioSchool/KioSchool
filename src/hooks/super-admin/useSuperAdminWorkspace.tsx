import { PaginationResponse, Workspace } from '@@types/index';
import { defaultPaginationValue } from '@@types/PaginationType';
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

    const response = superAdminApi
      .get<PaginationResponse<Workspace>>('/workspaces', { params })
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        console.error(error);
        return defaultPaginationValue;
      });

    return response;
  };

  return { fetchAllWorkspaces };
}

export default useSuperAdminWorkspace;
