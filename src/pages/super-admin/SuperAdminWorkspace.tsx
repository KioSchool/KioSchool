import { useEffect, useState } from 'react';
import { Location, useSearchParams } from 'react-router-dom';
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
import { colFlex } from '@styles/flexStyles';
import { Color } from '@resources/colors';
import { SUPER_ADMIN_ROUTES } from '@constants/routes';

const PAGE_SIZE = 6;

function SuperAdminWorkspace() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [workspaces, setWorkspaces] = useState<PaginationResponse<Workspace>>(defaultPaginationValue);
  const { fetchAllWorkspaces } = useSuperAdminWorkspace();

  useEffect(() => {
    const page = Number(searchParams.get('page'));
    const name = searchParams.get('name') || '';
    fetchAllWorkspaces(page, PAGE_SIZE, name).then(setWorkspaces);
  }, [searchParams.toString(), fetchAllWorkspaces]);

  const handlePageChange = (page: number) => {
    searchParams.set('page', page.toString());
    setSearchParams(searchParams);
  };

  return (
    <AppContainer useFlex={colFlex({ align: 'center' })} backgroundColor={Color.LIGHT_GREY} useTitle={false}>
      <SuperAdminPageContainer>
        <PageHeader title="워크스페이스 관리" description="서비스에 등록된 모든 주점(워크스페이스)을 조회하고 점검합니다." />
        <PaginationSearchBar />
        <PaginationSearchContents contents={workspaces} target="워크스페이스" ContentComponent={SuperAdminWorkspaceContent} />
        <Pagination totalPageCount={workspaces.totalPages} paginateFunction={handlePageChange} />
      </SuperAdminPageContainer>
      <RightSidebarModal useExternalControl={{ location: { pathname: SUPER_ADMIN_ROUTES.WORKSPACE } as Location }} />
    </AppContainer>
  );
}

export default SuperAdminWorkspace;
