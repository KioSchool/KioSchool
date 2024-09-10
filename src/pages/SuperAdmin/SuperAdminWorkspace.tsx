import AppContainer from '@components/common/container/AppContainer';
import Pagination from '@components/common/pagination/Pagination';
import SuperAdminSearchBar from '@components/SuperAdmin/workspace/SuperAdminSearchBar';
import styled from '@emotion/styled';
import { userPaginationResponseAtom } from '@recoils/atoms';
import { useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import SuperAdminWorkspaceContents from './SuperAdminWorkspaceContents';
import useSuperAdminWorkspace from '@hooks/SuperAdmin/useSuperAdminWorkspace';
import { colFlex } from '@styles/flexStyles';

const ContentContainer = styled.div<{ justifyCenter?: boolean }>`
  height: 550px;
  ${(props) =>
    colFlex({
      justify: props.justifyCenter ? 'center' : 'flex-start',
      align: 'center',
    })}
`;

function SuperAdminWorkspace() {
  const userInputRef = useRef<HTMLInputElement | null>(null);
  const workspaces = useRecoilValue(userPaginationResponseAtom);
  const { fetchAllWorkspaces } = useSuperAdminWorkspace();
  const size = 6;
  const emptyWorkspaces = workspaces.numberOfElements === 0;

  useEffect(() => {
    fetchAllWorkspaces(0, size);
  }, []);

  return (
    <AppContainer
      contentsJustify={'center'}
      customWidth={'1000px'}
      customHeight={'100%'}
      customGap={'20px'}
      titleNavBarProps={{ title: '전체 워크스페이스 관리' }}
    >
      <>
        <SuperAdminSearchBar ref={userInputRef} />
        <ContentContainer justifyCenter={emptyWorkspaces} className={'content-container'}>
          <SuperAdminWorkspaceContents workspaces={workspaces} />
        </ContentContainer>
        <Pagination
          totalPageCount={workspaces.totalPages}
          paginateFunction={(page: number) => {
            fetchAllWorkspaces(page, size, userInputRef.current?.value);
          }}
        />
      </>
    </AppContainer>
  );
}

export default SuperAdminWorkspace;
