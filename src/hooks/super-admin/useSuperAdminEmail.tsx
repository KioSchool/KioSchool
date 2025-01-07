import { PaginationResponse, EmailDomain } from '@@types/index';
import useApi from '@hooks/useApi';
import { emailDomainPaginationResponseAtom } from '@recoils/atoms';
import { useSearchParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

interface FetchAllEmailDomainParamsType {
  page: number;
  size: number;
  name?: string;
}

interface AddEmailDomainParamsType {
  name: string;
  domain: string;
}

function useSuperAdminEmail() {
  const setEmailPaginationResponse = useSetRecoilState(emailDomainPaginationResponseAtom);
  const [searchParams, setSearchParams] = useSearchParams();
  const { superAdminApi } = useApi();

  const fetchAllEmailDomain = (page: number, size: number, name?: string) => {
    const params: FetchAllEmailDomainParamsType = { page, size, name };

    superAdminApi
      .get<PaginationResponse<EmailDomain>>('/email-domains', { params })
      .then((res) => {
        searchParams.set('page', params.page.toString());
        setSearchParams(searchParams);
        setEmailPaginationResponse(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const addEmailDomain = (name: string, domain: string) => {
    const params: AddEmailDomainParamsType = { name, domain };

    superAdminApi
      .post('/email-domain', params)
      .then(() => {
        fetchAllEmailDomain(0, 6);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const deleteEmailDomain = (domainId: Number) => {
    superAdminApi
      .delete('/email-domain', { data: { domainId } })
      .then(() => {
        fetchAllEmailDomain(0, 6);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return { fetchAllEmailDomain, addEmailDomain, deleteEmailDomain };
}

export default useSuperAdminEmail;
