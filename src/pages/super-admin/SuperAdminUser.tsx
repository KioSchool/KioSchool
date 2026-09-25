import { useEffect, useState } from 'react';
import { Location, useSearchParams } from 'react-router-dom';
import styled from '@emotion/styled';
import AppContainer from '@components/common/container/AppContainer';
import Pagination from '@components/common/pagination/Pagination';
import PaginationSearchBar from '@components/common/pagination/PaginationSearchBar';
import PageHeader from '@components/common/page/PageHeader';
import RightSidebarModal from '@components/common/modal/RightSidebarModal';
import SuperAdminPageContainer from '@components/super-admin/SuperAdminPageContainer';
import SuperAdminFilterTabs, { FilterTab } from '@components/super-admin/SuperAdminFilterTabs';
import SuperAdminUserContent from '@components/super-admin/user/SuperAdminUserContent';
import useSuperAdminUser from '@hooks/super-admin/useSuperAdminUser';
import { PaginationResponse, SuperAdminUser as SuperAdminUserItem, UserAccountFilter } from '@@types/index';
import { defaultPaginationValue } from '@@types/defaultValues';
import { SUPER_ADMIN_ROUTES } from '@constants/routes';
import { Color } from '@resources/colors';
import { colFlex } from '@styles/flexStyles';
import { formatNumber } from '@utils/formatNumber';
import { USER_ACCOUNT_FILTERS, USER_ACCOUNT_FILTER_LABEL, parseUserAccountFilter } from '@utils/userAccountFilter';

const PAGE_SIZE = 20;
const ALL_FILTER = 'ALL';

type AccountTabValue = UserAccountFilter | typeof ALL_FILTER;

const ACCOUNT_TABS: FilterTab<AccountTabValue>[] = [
  { label: '전체', value: ALL_FILTER },
  ...USER_ACCOUNT_FILTERS.map((filter) => ({ label: USER_ACCOUNT_FILTER_LABEL[filter], value: filter })),
];

const List = styled.div`
  width: 100%;
  ${colFlex()}
`;

const CountText = styled.div`
  width: 100%;
  font-size: 13px;
  color: ${Color.GREY};
`;

const EmptyText = styled.div`
  width: 100%;
  padding: 60px 0;
  font-size: 14px;
  color: ${Color.GREY};
  text-align: center;
`;

function SuperAdminUser() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [users, setUsers] = useState<PaginationResponse<SuperAdminUserItem>>(defaultPaginationValue);
  const [isLoading, setIsLoading] = useState(true);
  const { fetchAllUsers } = useSuperAdminUser();

  const accountFilter = parseUserAccountFilter(searchParams.get('account'));

  useEffect(() => {
    const page = Number(searchParams.get('page'));
    const keyword = searchParams.get('name') || undefined;
    setIsLoading(true);
    fetchAllUsers({ page, size: PAGE_SIZE, keyword, accountFilter })
      .then(setUsers)
      .finally(() => setIsLoading(false));
  }, [searchParams.toString(), fetchAllUsers]);

  const handlePageChange = (page: number) => {
    searchParams.set('page', page.toString());
    setSearchParams(searchParams);
  };

  const handleAccountFilterChange = (value: AccountTabValue) => {
    if (value === ALL_FILTER) searchParams.delete('account');
    else searchParams.set('account', value);
    searchParams.set('page', '0');
    setSearchParams(searchParams);
  };

  return (
    <AppContainer useFlex={colFlex({ align: 'center' })} useTitle={false}>
      <SuperAdminPageContainer>
        <PageHeader title="사용자 관리" description="가입한 사용자를 찾고 계좌 연동 상태와 소속 주점을 확인합니다." />
        <SuperAdminFilterTabs label="계좌" tabs={ACCOUNT_TABS} value={accountFilter ?? ALL_FILTER} onChange={handleAccountFilterChange} />
        <PaginationSearchBar placeholder="이름·이메일·아이디로 검색" />
        <CountText>총 {formatNumber(users.totalElements)}명</CountText>
        {!isLoading && users.empty && <EmptyText>조건에 맞는 사용자가 없습니다.</EmptyText>}
        <List>
          {users.content.map((user) => (
            <SuperAdminUserContent key={user.id} user={user} />
          ))}
        </List>
        <Pagination totalPageCount={users.totalPages} paginateFunction={handlePageChange} />
      </SuperAdminPageContainer>
      <RightSidebarModal useExternalControl={{ location: { pathname: SUPER_ADMIN_ROUTES.USER } as Location }} />
    </AppContainer>
  );
}

export default SuperAdminUser;
