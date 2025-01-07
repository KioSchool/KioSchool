import AppContainer from '@components/common/container/AppContainer';
import Pagination from '@components/common/pagination/Pagination';
import SuperAdminSearchBar from '@components/super-admin/workspace/SuperAdminSearchBar';
import styled from '@emotion/styled';
import useSuperAdminWorkspace from '@hooks/super-admin/useSuperAdminWorkspace';
import { colFlex } from '@styles/flexStyles';
import SuperAdminWorkspaceContent from '@components/super-admin/workspace/SuperAdminWorkspaceContent';
import { useNavigate, useSearchParams } from 'react-router-dom';
import SuperAdminSearchContents from '@components/super-admin/SuperAdminSearchContents';
import { PaginationResponse, Workspace } from '@@types/index';
import { useEffect, useRef, useState } from 'react';
import { defaultPaginationValue } from '@@types/PaginationType';

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
  const [searchParams] = useSearchParams();
  const [workspaces, setWorkspaces] = useState<PaginationResponse<Workspace>>(defaultPaginationValue);
  const userInputRef = useRef<HTMLInputElement | null>(null);
  const { fetchAllWorkspaces } = useSuperAdminWorkspace();
  const isEmptyWorkspaces = workspaces.empty;

  const fetchAndSetWorkspaces = async (page: number, size: number, name: string | undefined, replace?: boolean) => {
    const workspaceResponse = await fetchAllWorkspaces(page, size, name, replace ?? false);
    setWorkspaces(workspaceResponse);
  };

  useEffect(() => {
    const nowPage = Number(searchParams.get('page'));

    if (userInputRef.current?.value === null) {
      fetchAndSetWorkspaces(nowPage, pageSize, '', true);
    } else {
      fetchAndSetWorkspaces(nowPage, pageSize, userInputRef.current?.value, true);
    }
  }, [searchParams]);

  return (
    <AppContainer
      useFlex={colFlex({ justify: 'center' })}
      customWidth={'1000px'}
      customHeight={'100%'}
      customGap={'20px'}
      titleNavBarProps={{ title: '전체 워크스페이스 관리', onLeftArrowClick: () => navigate('/super-admin/manage') }}
    >
      <>
        <SuperAdminSearchBar ref={userInputRef} fetchContents={fetchAndSetWorkspaces} />
        <ContentContainer justifyCenter={isEmptyWorkspaces} className={'content-container'}>
          <SuperAdminSearchContents contents={workspaces} target={'워크스페이스'} ContentComponent={SuperAdminWorkspaceContent} />
        </ContentContainer>
        <Pagination
          totalPageCount={workspaces.totalPages}
          paginateFunction={(page: number) => {
            fetchAndSetWorkspaces(page, pageSize, userInputRef.current?.value);
          }}
        />
      </>
    </AppContainer>
  );
}

export default SuperAdminWorkspace;
