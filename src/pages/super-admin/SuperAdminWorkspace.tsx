import { useEffect, useState } from 'react';
import { Location, useSearchParams } from 'react-router-dom';
import styled from '@emotion/styled';
import AppContainer from '@components/common/container/AppContainer';
import Pagination from '@components/common/pagination/Pagination';
import PaginationSearchBar from '@components/common/pagination/PaginationSearchBar';
import PaginationSearchContents from '@components/common/pagination/PaginationSearchContents';
import PageHeader from '@components/common/page/PageHeader';
import SuperAdminPageContainer from '@components/super-admin/SuperAdminPageContainer';
import RightSidebarModal from '@components/common/modal/RightSidebarModal';
import SuperAdminWorkspaceContent from '@components/super-admin/workspace/SuperAdminWorkspaceContent';
import useSuperAdminWorkspace from '@hooks/super-admin/useSuperAdminWorkspace';
import { PaginationResponse, Workspace } from '@@types/index';
import { defaultPaginationValue } from '@@types/defaultValues';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { Color } from '@resources/colors';
import { SUPER_ADMIN_ROUTES } from '@constants/routes';

const PAGE_SIZE = 6;

type FilterPeriod = 'all' | 'yesterday' | 'week';

const FILTER_TABS: { label: string; value: FilterPeriod }[] = [
  { label: '전체', value: 'all' },
  { label: '어제', value: 'yesterday' },
  { label: '최근 7일', value: 'week' },
];

const TabContainer = styled.div`
  gap: 8px;

  ${rowFlex({ align: 'center' })};
`;

const TabLabel = styled.span`
  font-size: 14px;
  color: ${Color.GREY};
`;

interface TabButtonProps {
  isActive: boolean;
}

const TabButton = styled.button<TabButtonProps>`
  padding: 6px 16px;
  border-radius: 20px;
  border: 1.5px solid ${({ isActive }) => (isActive ? Color.KIO_ORANGE : Color.HEAVY_GREY)};
  background: ${({ isActive }) => (isActive ? Color.KIO_ORANGE_FAINT : Color.WHITE)};
  color: ${({ isActive }) => (isActive ? Color.KIO_ORANGE_DARK : Color.GREY)};
  font-size: 14px;
  font-weight: ${({ isActive }) => (isActive ? 600 : 400)};
  cursor: pointer;
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
  const [workspaces, setWorkspaces] = useState<PaginationResponse<Workspace>>(defaultPaginationValue);
  const { fetchAllWorkspaces } = useSuperAdminWorkspace();

  const period = (searchParams.get('period') as FilterPeriod) || 'all';

  useEffect(() => {
    const page = Number(searchParams.get('page'));
    const name = searchParams.get('name') || '';
    const updatedAfter = getUpdatedAfter(period);
    fetchAllWorkspaces(page, PAGE_SIZE, name, updatedAfter).then(setWorkspaces);
  }, [searchParams.toString(), fetchAllWorkspaces]);

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
        <TabContainer>
          <TabLabel>수정 기준</TabLabel>
          {FILTER_TABS.map(({ label, value }) => (
            <TabButton key={value} isActive={period === value} onClick={() => handlePeriodChange(value)}>
              {label}
            </TabButton>
          ))}
        </TabContainer>
        <PaginationSearchBar />
        <PaginationSearchContents contents={workspaces} target="워크스페이스" ContentComponent={SuperAdminWorkspaceContent} />
        <Pagination totalPageCount={workspaces.totalPages} paginateFunction={handlePageChange} />
      </SuperAdminPageContainer>
      <RightSidebarModal useExternalControl={{ location: { pathname: SUPER_ADMIN_ROUTES.WORKSPACE } as Location }} />
    </AppContainer>
  );
}

export default SuperAdminWorkspace;
