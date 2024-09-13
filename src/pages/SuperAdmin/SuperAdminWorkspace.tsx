import AppContainer from '@components/common/container/AppContainer';
import Pagination from '@components/common/pagination/Pagination';
import SuperAdminSearchBar from '@components/SuperAdmin/workspace/SuperAdminSearchBar';
import styled from '@emotion/styled';
import { workspacePaginationResponseAtom } from '@recoils/atoms';
import { useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import SuperAdminSearchContents from './SuperAdminSearchContents';
import useSuperAdminWorkspace from '@hooks/SuperAdmin/useSuperAdminWorkspace';
import { colFlex } from '@styles/flexStyles';
import SuperAdminWorkspaceContent from '@components/SuperAdmin/workspace/SuperAdminWorkspaceContent';
import { useNavigate } from 'react-router-dom';

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
  const userInputRef = useRef<HTMLInputElement | null>(null);
  const workspaces = useRecoilValue(workspacePaginationResponseAtom);
  const { fetchAllWorkspaces } = useSuperAdminWorkspace();
  const isEmptyWorkspaces = workspaces.empty;

  useEffect(() => {
    fetchAllWorkspaces(0, pageSize);
  }, []);

  return (
    <AppContainer
      useFlex={colFlex({ justify: 'center' })}
      customWidth={'1000px'}
      customHeight={'100%'}
      customGap={'20px'}
      titleNavBarProps={{ title: '전체 워크스페이스 관리', onLeftArrowClick: () => navigate('/super-admin/manage') }}
    >
      <>
        <SuperAdminSearchBar ref={userInputRef} fetchContents={fetchAllWorkspaces} />
        <ContentContainer justifyCenter={isEmptyWorkspaces} className={'content-container'}>
          <SuperAdminSearchContents contents={workspaces} target={'워크스페이스'} ContentComponent={SuperAdminWorkspaceContent} />
        </ContentContainer>
        <Pagination
          totalPageCount={workspaces.totalPages}
          paginateFunction={(page: number) => {
            fetchAllWorkspaces(page, pageSize, userInputRef.current?.value);
          }}
        />
      </>
    </AppContainer>
  );
}

export default SuperAdminWorkspace;
