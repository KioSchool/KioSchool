import { PaginationResponse, EmailDomain } from '@@types/index';
import { defaultPaginationValue } from '@@types/PaginationType';
import useApi from '@hooks/useApi';

interface FetchAllEmailDomainParamsType {
  page: number;
  size: number;
  name?: string;
}

function useEmail() {
  const { userApi } = useApi();

  const fetchAllEmailDomain = (page: number, size: number, name?: string) => {
    const params: FetchAllEmailDomainParamsType = { page, size, name };

    const response = userApi
      .get<PaginationResponse<EmailDomain>>('/email-domains', { params })
      .then((res) => {
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
