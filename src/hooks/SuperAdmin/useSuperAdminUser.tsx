import { PaginationResponse, User } from '@@types/index';
import useApi from '@hooks/useApi';
import { userPaginationResponseAtom } from '@recoils/atoms';
import { useSearchParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

interface FetchAllUsersParamsType {
  page: number;
  size: number;
  name?: string;
}

function useSuperAdminUser() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { superAdminApi } = useApi();
  const setUserPaginationResponse = useSetRecoilState(userPaginationResponseAtom);

  const fetchAllUsers = (page: number, size: number, name?: string) => {
    const params: FetchAllUsersParamsType = { page, size, name };

    superAdminApi
      .get<PaginationResponse<User>>('/users', { params })
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
