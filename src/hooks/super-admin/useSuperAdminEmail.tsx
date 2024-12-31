import { PaginationResponse, EmailDomain } from '@@types/index';
import { defaultPaginationValue } from '@@types/PaginationType';
import useApi from '@hooks/useApi';
import { useSearchParams } from 'react-router-dom';

interface FetchAllUsersParamsType {
  page: number;
  size: number;
  name?: string;
}

function useSuperAdminEmail() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { superAdminApi } = useApi();

  const fetchAllEmails = (page: number, size: number, name?: string) => {
    const params: FetchAllUsersParamsType = { page, size, name };

    const response = superAdminApi
      .get<PaginationResponse<EmailDomain>>('/users', { params })
      .then((res) => {
        searchParams.set('page', params.page.toString());
        setSearchParams(searchParams);
        return res.data;
      })
      .catch((error) => {
        console.error(error);
        return defaultPaginationValue;
      });

    return response;
  };

  return { fetchAllEmails };
}

export default useSuperAdminEmail;
