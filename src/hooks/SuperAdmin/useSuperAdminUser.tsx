import { Workspace, PaginationResponse } from '@@types/index';
import useApi from '@hooks/useApi';
import { userPaginationResponseAtom } from '@recoils/atoms';
import { useSearchParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

interface ParamsType {
  page: number;
  size: number;
  username?: string;
}

function useSuperAdminUser() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { superAdminApi } = useApi();
  const setUserPaginationResponse = useSetRecoilState(userPaginationResponseAtom);

  const fetchAllUsers = (page: number, size: number, username?: string) => {
    const params: ParamsType = { page, size };
    if (username) {
      params.username = username;
    }

    superAdminApi
      .get<PaginationResponse<Workspace>>('/users', { params: params })
      .then((res) => {
        setUserPaginationResponse(res.data);
        searchParams.set('page', params.page.toString());
        setSearchParams(searchParams);
      })
      .catch((error) => console.error(error));
  };

  return { fetchAllUsers };
}

export default useSuperAdminUser;
