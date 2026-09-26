import { useCallback } from 'react';
import { PaginationResponse, SuperAdminUser, UserAccountFilter } from '@@types/index';
import { defaultPaginationValue } from '@@types/defaultValues';
import useApi from '@hooks/useApi';

interface FetchAllUsersParams {
  page: number;
  size: number;
  keyword?: string;
  accountFilter?: UserAccountFilter;
}

function useSuperAdminUser() {
  const { superAdminApi } = useApi();

  const fetchAllUsers = useCallback(
    (params: FetchAllUsersParams): Promise<PaginationResponse<SuperAdminUser>> => {
      return superAdminApi
        .get<PaginationResponse<SuperAdminUser>>('/users', { params })
        .then((res) => res.data)
        .catch((error) => {
          console.error(error);
          return defaultPaginationValue;
        });
    },
    [superAdminApi],
  );

  return { fetchAllUsers };
}

export default useSuperAdminUser;
