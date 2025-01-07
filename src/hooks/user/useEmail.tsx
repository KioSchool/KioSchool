import { PaginationResponse, EmailDomain } from '@@types/index';
import { defaultPaginationValue } from '@@types/PaginationType';
import useApi from '@hooks/useApi';
import { useSearchParams } from 'react-router-dom';

interface FetchAllEmailDomainParamsType {
  page: number;
  size: number;
  name?: string;
}

function useEmail() {
  const { userApi } = useApi();
  const [searchParams, setSearchParams] = useSearchParams();

  const fetchAllEmailDomain = (page: number, size: number, name?: string, replace?: boolean) => {
    const params: FetchAllEmailDomainParamsType = { page, size, name };

    const response = userApi
      .get<PaginationResponse<EmailDomain>>('/email-domains', { params })
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

  return { fetchAllEmailDomain };
}

export default useEmail;
