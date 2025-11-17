import AppContainer from '@components/common/container/AppContainer';
import Pagination from '@components/common/pagination/Pagination';
import PaginationSearchBar from '@components/common/pagination/PaginationSearchBar';
import useSuperAdminWorkspace from '@hooks/super-admin/useSuperAdminWorkspace';
import { colFlex } from '@styles/flexStyles';
import SuperAdminWorkspaceContent from '@components/super-admin/workspace/SuperAdminWorkspaceContent';
import { useSearchParams } from 'react-router-dom';
import PaginationSearchContents from '@components/common/pagination/PaginationSearchContents';
import { PaginationResponse, Workspace } from '@@types/index';
import { useEffect, useState } from 'react';
import { defaultPaginationValue } from '@@types/defaultValues';

function SuperAdminWorkspace() {
  const pageSize = 6;
  const [searchParams, setSearchParams] = useSearchParams();
  const [workspaces, setWorkspaces] = useState<PaginationResponse<Workspace>>(defaultPaginationValue);
  const { fetchAllWorkspaces } = useSuperAdminWorkspace();

  const fetchAndSetWorkspaces = async (page: number, size: number, name: string | undefined) => {
    const workspaceResponse = await fetchAllWorkspaces(page, size, name);
    setWorkspaces(workspaceResponse);
  };

  useEffect(() => {
    const nowPage = Number(searchParams.get('page'));
    const searchValue = searchParams.get('name') || '';

    fetchAndSetWorkspaces(nowPage, pageSize, searchValue);
  }, [searchParams.toString()]);

  return (
    <AppContainer useFlex={colFlex({ justify: 'center' })} customWidth={'1000px'} customGap={'20px'} useTitle={false}>
      <>
        <PaginationSearchBar />
        <PaginationSearchContents contents={workspaces} target={'워크스페이스'} ContentComponent={SuperAdminWorkspaceContent} />
        <Pagination
          totalPageCount={workspaces.totalPages}
          paginateFunction={(page: number) => {
            searchParams.set('page', page.toString());
            setSearchParams(searchParams);
          }}
        />
      </>
    </AppContainer>
  );
}

export default SuperAdminWorkspace;
