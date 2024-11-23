import { PaginationResponse, User } from '@@types/index';
import useApi from '@hooks/useApi';
import { useSearchParams } from 'react-router-dom';

interface FetchAllUsersParamsType {
  page: number;
  size: number;
  name?: string;
}

function useSuperAdminUser() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { superAdminApi } = useApi();

  const fetchAllUsers = (page: number, size: number, name?: string) => {
    const params: FetchAllUsersParamsType = { page, size, name };

    const response = superAdminApi
      .get<PaginationResponse<User>>('/users', { params })
      .then((res) => {
        searchParams.set('page', params.page.toString());
        setSearchParams(searchParams);
        return res.data;
      })
      .catch((error) => {
        console.error(error);
        return null;
      });

    return response;
  };

  return { fetchAllUsers };
}

export default useSuperAdminUser;
