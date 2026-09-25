import { useCallback, useEffect, useState } from 'react';
import { Location, useSearchParams } from 'react-router-dom';
import styled from '@emotion/styled';
import AppContainer from '@components/common/container/AppContainer';
import Pagination from '@components/common/pagination/Pagination';
import PaginationSearchBar from '@components/common/pagination/PaginationSearchBar';
import PageHeader from '@components/common/page/PageHeader';
import RightSidebarModal from '@components/common/modal/RightSidebarModal';
import SuperAdminPageContainer from '@components/super-admin/SuperAdminPageContainer';
import SuperAdminFilterTabs, { FilterTab } from '@components/super-admin/SuperAdminFilterTabs';
import SuperAdminWorkspaceContent from '@components/super-admin/workspace/SuperAdminWorkspaceContent';
import useSuperAdminWorkspace from '@hooks/super-admin/useSuperAdminWorkspace';
import { PaginationResponse, SuperAdminWorkspace as SuperAdminWorkspaceItem } from '@@types/index';
import { defaultPaginationValue } from '@@types/defaultValues';
import { colFlex } from '@styles/flexStyles';
import { Color } from '@resources/colors';
import { formatNumber } from '@utils/formatNumber';
import { SUPER_ADMIN_ROUTES } from '@constants/routes';

const PAGE_SIZE = 20;

type FilterPeriod = 'all' | 'yesterday' | 'week';

const FILTER_TABS: FilterTab<FilterPeriod>[] = [
  { label: '전체', value: 'all' },
  { label: '어제', value: 'yesterday' },
  { label: '최근 7일', value: 'week' },
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

function getUpdatedAfter(period: FilterPeriod): string | undefined {
  if (period === 'all') return undefined;
  const date = new Date();
  date.setDate(date.getDate() - (period === 'yesterday' ? 1 : 6));
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T00:00:00`;
}

function SuperAdminWorkspace() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [workspaces, setWorkspaces] = useState<PaginationResponse<SuperAdminWorkspaceItem>>(defaultPaginationValue);
  const [isLoading, setIsLoading] = useState(true);
  const [reloadKey, setReloadKey] = useState(0);
  const { fetchAllWorkspaces } = useSuperAdminWorkspace();

  const period = (searchParams.get('period') as FilterPeriod) || 'all';

  useEffect(() => {
    const page = Number(searchParams.get('page'));
    const keyword = searchParams.get('name') || undefined;
    const updatedAfter = getUpdatedAfter(period);
    setIsLoading(true);
    fetchAllWorkspaces(page, PAGE_SIZE, keyword, updatedAfter)
      .then(setWorkspaces)
      .finally(() => setIsLoading(false));
  }, [searchParams.toString(), fetchAllWorkspaces, reloadKey]);

  const reload = useCallback(() => setReloadKey((prev) => prev + 1), []);

  const handlePageChange = (page: number) => {
    searchParams.set('page', page.toString());
    setSearchParams(searchParams);
  };

  const handlePeriodChange = (value: FilterPeriod) => {
    searchParams.set('period', value);
    searchParams.set('page', '0');
    setSearchParams(searchParams);
  };

  return (
    <AppContainer useFlex={colFlex({ align: 'center' })} useTitle={false}>
      <SuperAdminPageContainer>
        <PageHeader title="워크스페이스 관리" description="서비스에 등록된 모든 주점(워크스페이스)을 조회하고 점검합니다." />
        <SuperAdminFilterTabs label="수정 기준" tabs={FILTER_TABS} value={period} onChange={handlePeriodChange} />
        <PaginationSearchBar placeholder="주점 이름, 사장 이름·이메일·아이디로 검색" />
        <CountText>총 {formatNumber(workspaces.totalElements)}곳</CountText>
        {!isLoading && workspaces.empty && <EmptyText>조건에 맞는 워크스페이스가 없습니다.</EmptyText>}
        <List>
          {workspaces.content.map((workspace) => (
            <SuperAdminWorkspaceContent key={workspace.id} workspace={workspace} onChanged={reload} />
          ))}
        </List>
        <Pagination totalPageCount={workspaces.totalPages} paginateFunction={handlePageChange} />
      </SuperAdminPageContainer>
      <RightSidebarModal useExternalControl={{ location: { pathname: SUPER_ADMIN_ROUTES.WORKSPACE } as Location }} />
    </AppContainer>
  );
}

export default SuperAdminWorkspace;
