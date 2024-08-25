import { Workspace, PaginationResponse } from '@@types/index';
import useApi from '@hooks/useApi';
import { userPaginationResponseAtom } from '@recoils/atoms';
import { useSearchParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

interface ParamsType {
  page: number;
  size: number;
  name?: string;
}

function useSuperAdminWorkspace() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { superAdminApi } = useApi();
  const setUserPaginationResponse = useSetRecoilState(userPaginationResponseAtom);

  const fetchAllWorkspaces = (page: number, size: number, name?: string) => {
    const params: ParamsType = { page, size };
    if (name) {
      params.name = name;
    }

    superAdminApi
      .get<PaginationResponse<Workspace>>('/workspaces', { params: params })
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
