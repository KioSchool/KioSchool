import { PaginationResponse, EmailDomain } from '@@types/index';
import { defaultPaginationValue } from '@@types/PaginationType';
import useApi from '@hooks/useApi';
import { useSearchParams } from 'react-router-dom';

interface FetchAllEmailsParamsType {
  page: number;
  size: number;
  name?: string;
}

interface AddEmailsParamsType {
  name: string;
  domain: string;
}

function useSuperAdminEmail() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { superAdminApi } = useApi();

  const fetchAllEmails = (page: number, size: number, name?: string) => {
    const params: FetchAllEmailsParamsType = { page, size, name };

    const response = superAdminApi
      .get<PaginationResponse<EmailDomain>>('/email-domains', { params })
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

  const addEmailDomain = (name: string, domain: string) => {
    const params: AddEmailsParamsType = { name, domain };

    superAdminApi.post('/email-domain', params).catch((error) => {
      console.error(error);
    });
  };

  const deleteEmailDomain = (domainId: Number) => {
    superAdminApi.delete('/email-domain', { data: { domainId } }).catch((error) => {
      console.error(error);
    });
  };

  return { fetchAllEmails, addEmailDomain, deleteEmailDomain };
}

export default useSuperAdminEmail;
