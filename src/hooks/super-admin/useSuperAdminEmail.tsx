import { PaginationResponse, EmailDomain } from '@@types/index';
import useApi from '@hooks/useApi';
import { useSetAtom } from 'jotai';
import { superAdminEmailDomainPaginationResponseAtom } from '@jotai/super-admin/atoms';
import { API_ERROR_CODES } from '@constants/errorCodes';
import { getApiErrorMessage, isApiErrorCode } from '@utils/apiError';

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
  const setEmailPaginationResponse = useSetAtom(superAdminEmailDomainPaginationResponseAtom);
  const { superAdminApi } = useApi();

  const fetchAllEmailDomain = (page: number, size: number, name?: string) => {
    const params: FetchAllEmailDomainParamsType = { page, size, name };

    superAdminApi
      .get<PaginationResponse<EmailDomain>>('/email-domains', { params })
      .then((res) => {
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
      .catch((error: unknown) => {
        if (isApiErrorCode(error, API_ERROR_CODES.DUPLICATE_EMAIL_DOMAIN)) {
          alert(getApiErrorMessage(error, '이미 등록된 도메인입니다.'));
        }
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
