import { PaginationResponse, User } from '@@types/index';
import { defaultPaginationValue } from '@@types/defaultValues';
import useApi from '@hooks/useApi';

interface FetchAllUsersParamsType {
  page: number;
  size: number;
  name?: string;
}

function useSuperAdminUser() {
  const { superAdminApi } = useApi();

  const fetchAllUsers = (page: number, size: number, name?: string) => {
    const params: FetchAllUsersParamsType = { page, size, name };

    const response = superAdminApi
      .get<PaginationResponse<User>>('/users', { params })
      .then((res) => {
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
