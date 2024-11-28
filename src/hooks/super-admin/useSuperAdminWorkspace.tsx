import { PaginationResponse, Workspace } from '@@types/index';
import { defaultPaginationValue } from '@@types/PaginationType';
import useApi from '@hooks/useApi';
import { useSearchParams } from 'react-router-dom';

interface FetchAllWorkspacesParamsType {
  page: number;
  size: number;
  name?: string;
}

function useSuperAdminWorkspace() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { superAdminApi } = useApi();

  const fetchAllWorkspaces = (page: number, size: number, name?: string) => {
    const params: FetchAllWorkspacesParamsType = { page, size, name };

    const response = superAdminApi
      .get<PaginationResponse<Workspace>>('/workspaces', { params })
      .then((res) => {
        searchParams.set('page', params.page.toString());
        setSearchParams(searchParams);
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
