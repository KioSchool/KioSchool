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
  status?: string[];
}

const serializeOrdersParams = (params: Record<string, unknown>) => {
  const usp = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => {
        if (item !== undefined && item !== null) usp.append(key, String(item));
      });
    } else if (value !== undefined && value !== null) {
      usp.append(key, String(value));
    }
  });
  return usp.toString();
};

function useSuperAdminOrders() {
  const { superAdminApi } = useApi();

  const fetchAllOrders = useCallback(
    (params: FetchAllOrdersParams): Promise<PaginationResponse<SuperAdminOrder>> => {
      return superAdminApi
        .get<PaginationResponse<SuperAdminOrder>>('/orders', {
          params,
          paramsSerializer: serializeOrdersParams,
        })
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
