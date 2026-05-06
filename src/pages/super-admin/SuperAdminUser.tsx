import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import AppContainer from '@components/common/container/AppContainer';
import Pagination from '@components/common/pagination/Pagination';
import PaginationSearchBar from '@components/common/pagination/PaginationSearchBar';
import PaginationSearchContents from '@components/common/pagination/PaginationSearchContents';
import PageHeader from '@components/common/page/PageHeader';
import SuperAdminPageContainer from '@components/super-admin/SuperAdminPageContainer';
import SuperAdminUserContent from '@components/super-admin/user/SuperAdminUserContent';
import useSuperAdminUser from '@hooks/super-admin/useSuperAdminUser';
import { PaginationResponse, User } from '@@types/index';
import { defaultPaginationValue } from '@@types/defaultValues';
import { colFlex } from '@styles/flexStyles';

const PAGE_SIZE = 6;

function SuperAdminUser() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [users, setUsers] = useState<PaginationResponse<User>>(defaultPaginationValue);
  const { fetchAllUsers } = useSuperAdminUser();

  useEffect(() => {
    const page = Number(searchParams.get('page'));
    const name = searchParams.get('name') || '';
    fetchAllUsers(page, PAGE_SIZE, name).then(setUsers);
  }, [searchParams.toString()]);

  const handlePageChange = (page: number) => {
    searchParams.set('page', page.toString());
    setSearchParams(searchParams);
  };

  return (
    <AppContainer useFlex={colFlex({ align: 'center' })} useTitle={false}>
      <SuperAdminPageContainer>
        <PageHeader title="사용자 관리" description="서비스에 가입한 모든 사용자를 조회합니다." />
        <PaginationSearchBar />
        <PaginationSearchContents contents={users} target="유저" ContentComponent={SuperAdminUserContent} />
        <Pagination totalPageCount={users.totalPages} paginateFunction={handlePageChange} />
      </SuperAdminPageContainer>
    </AppContainer>
  );
}

export default SuperAdminUser;
