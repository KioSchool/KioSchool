import { PaginationResponse, User } from '@@types/index';
import { defaultPaginationValue } from '@@types/PaginationType';
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

  const fetchAllUsers = (page: number, size: number, name?: string, replace?: boolean) => {
    const params: FetchAllUsersParamsType = { page, size, name };

    const response = superAdminApi
      .get<PaginationResponse<User>>('/users', { params })
      .then((res) => {
        searchParams.set('page', params.page.toString());
        setSearchParams(searchParams, { replace });
        return res.data;
      })
      .catch((error) => {
        console.error(error);
        return defaultPaginationValue;
      });

    return response;
  };

  return { fetchAllUsers };
}

export default useSuperAdminUser;
