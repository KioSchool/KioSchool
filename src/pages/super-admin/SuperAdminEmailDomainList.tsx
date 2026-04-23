import PaginationSearchBar from '@components/common/pagination/PaginationSearchBar';
import { colFlex } from '@styles/flexStyles';
import { useEffect } from 'react';
import Pagination from '@components/common/pagination/Pagination';
import AppContainer from '@components/common/container/AppContainer';
import { useSearchParams } from 'react-router-dom';
import PaginationSearchContents from '@components/common/pagination/PaginationSearchContents';
import useSuperAdminEmail from '@hooks/super-admin/useSuperAdminEmail';
import SuperAdminEmailDomainContent from '@components/super-admin/email/SuperAdminEmailDomainContent';
import { superAdminEmailDomainPaginationResponseAtom } from '@jotai/super-admin/atoms';
import { useAtomValue } from 'jotai';

function SuperAdminEmailDomainList() {
  const pageSize = 6;
  const [searchParams, setSearchParams] = useSearchParams();
  const emailDomain = useAtomValue(superAdminEmailDomainPaginationResponseAtom);
  const { fetchAllEmailDomain } = useSuperAdminEmail();

  useEffect(() => {
    const nowPage = Number(searchParams.get('page'));
    const searchValue = searchParams.get('name') || '';

    fetchAllEmailDomain(nowPage, pageSize, searchValue);
  }, [searchParams.toString()]);

  return (
    <AppContainer useFlex={colFlex({ justify: 'center' })} customWidth={'1000px'} customGap={'20px'} useTitle={false}>
      <>
        <PaginationSearchBar />
        <PaginationSearchContents contents={emailDomain} target={'이메일'} ContentComponent={SuperAdminEmailDomainContent} />
        <Pagination
          totalPageCount={emailDomain.totalPages}
          paginateFunction={(page: number) => {
            searchParams.set('page', page.toString());
            setSearchParams(searchParams);
          }}
        />
      </>
    </AppContainer>
  );
}

export default SuperAdminEmailDomainList;
