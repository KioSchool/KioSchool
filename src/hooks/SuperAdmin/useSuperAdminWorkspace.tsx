import { PaginationResponse, Workspace } from '@@types/index';
import useApi from '@hooks/useApi';
import { workspacePaginationResponseAtom } from '@recoils/atoms';
import { useSearchParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

interface FetchAllWorkspacesParamsType {
  page: number;
  size: number;
  name?: string;
}

function useSuperAdminWorkspace() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { superAdminApi } = useApi();
  const setUserPaginationResponse = useSetRecoilState(workspacePaginationResponseAtom);

  const fetchAllWorkspaces = (page: number, size: number, name?: string) => {
    const params: FetchAllWorkspacesParamsType = { page, size, name };

    superAdminApi
      .get<PaginationResponse<Workspace>>('/workspaces', { params })
      .then((res) => {
        setUserPaginationResponse(res.data);
        searchParams.set('page', params.page.toString());
        setSearchParams(searchParams);
      })
      .catch((error) => console.error(error));
  };

  return { fetchAllWorkspaces };
}

export default useSuperAdminWorkspace;
