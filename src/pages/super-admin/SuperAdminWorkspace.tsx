import AppContainer from '@components/common/container/AppContainer';
import Pagination from '@components/common/pagination/Pagination';
import PaginationSearchBar from '@components/common/pagination/PaginationSearchBar';
import styled from '@emotion/styled';
import useSuperAdminWorkspace from '@hooks/super-admin/useSuperAdminWorkspace';
import { colFlex } from '@styles/flexStyles';
import SuperAdminWorkspaceContent from '@components/super-admin/workspace/SuperAdminWorkspaceContent';
import { useNavigate, useSearchParams } from 'react-router-dom';
import PaginationSearchContents from '@components/common/pagination/PaginationSearchContents';
import { PaginationResponse, Workspace } from '@@types/index';
import { useEffect, useState } from 'react';
import { defaultPaginationValue } from '@@types/defaultValues';
import { SUPER_ADMIN_ROUTES } from '@constants/routes';

const ContentContainer = styled.div<{ justifyCenter?: boolean }>`
  height: 550px;
  ${(props) =>
    colFlex({
      justify: props.justifyCenter ? 'center' : 'flex-start',
      align: 'center',
    })}
`;

function SuperAdminWorkspace() {
  const pageSize = 6;
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [workspaces, setWorkspaces] = useState<PaginationResponse<Workspace>>(defaultPaginationValue);
  const { fetchAllWorkspaces } = useSuperAdminWorkspace();
  const isEmptyWorkspaces = workspaces.empty;

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
    <AppContainer
      useFlex={colFlex({ justify: 'center' })}
      customWidth={'1000px'}
      customGap={'20px'}
      titleNavBarProps={{ title: '전체 워크스페이스 관리', onLeftArrowClick: () => navigate(SUPER_ADMIN_ROUTES.MANAGE) }}
      useTitle={false}
    >
      <>
        <PaginationSearchBar />
        <ContentContainer justifyCenter={isEmptyWorkspaces} className={'content-container'}>
          <PaginationSearchContents contents={workspaces} target={'워크스페이스'} ContentComponent={SuperAdminWorkspaceContent} />
        </ContentContainer>
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
