import { Email, PaginationResponse } from '@@types/index';
import useApi from '@hooks/useApi';
import { emailPaginationResponseAtom } from '@recoils/atoms';
import { useSearchParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

interface FetchAllEmailsParamsType {
  page: number;
  size: number;
  name?: string;
}

function useSuperAdminEmail() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { superAdminApi } = useApi();
  const setEmailPaginationResponse = useSetRecoilState(emailPaginationResponseAtom);

  const fetchAllEmails = (page: number, size: number, name?: string) => {
    const params: FetchAllEmailsParamsType = { page, size, name };

    superAdminApi
      .get<PaginationResponse<Email>>('/email-domains', { params })
      .then((res) => {
        setEmailPaginationResponse(res.data);
        searchParams.set('page', params.page.toString());
        setSearchParams(searchParams);
      })
      .catch((error) => console.error(error));
  };

  return { fetchAllEmails };
}

export default useSuperAdminEmail;
