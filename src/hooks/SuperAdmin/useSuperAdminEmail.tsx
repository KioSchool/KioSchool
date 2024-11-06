import { Email, PaginationResponse } from '@@types/index';
import useApi from '@hooks/useApi';
import { emailPaginationResponseAtom } from '@recoils/atoms';
import { useSearchParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

function useSuperAdminEmail() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { superAdminApi } = useApi();
  const setEmailPaginationResponse = useSetRecoilState(emailPaginationResponseAtom);

  const fetchAllEmails = (page: number, size: number, name?: string) => {
    superAdminApi
      .get<PaginationResponse<Email>>('/email-domains', {
        params: { page, size, name },
      })
      .then((res) => {
        setEmailPaginationResponse(res.data);
        searchParams.set('page', page.toString());
        setSearchParams(searchParams);
      })
      .catch((error) => console.error(error));
  };

  return { fetchAllEmails };
}

export default useSuperAdminEmail;
