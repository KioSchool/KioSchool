import { useCallback } from 'react';
import { PaginationResponse, SuperAdminOrder } from '@@types/index';
import { defaultPaginationValue } from '@@types/defaultValues';
import useApi from '@hooks/useApi';

interface FetchAllOrdersParams {
  page: number;
  size: number;
  workspaceId?: number;
  startDate?: string;
  endDate?: string;
  statuses?: string[];
}

function useSuperAdminOrders() {
  const { superAdminApi } = useApi();

  const fetchAllOrders = useCallback(
    (params: FetchAllOrdersParams): Promise<PaginationResponse<SuperAdminOrder>> => {
      return superAdminApi
        .get<PaginationResponse<SuperAdminOrder>>('/orders', { params })
        .then((res) => res.data)
        .catch((error) => {
          console.error(error);
          return defaultPaginationValue;
        });
    },
    [superAdminApi],
  );

  return { fetchAllOrders };
}

export default useSuperAdminOrders;
