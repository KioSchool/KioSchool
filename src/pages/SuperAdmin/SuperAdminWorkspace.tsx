import AppContainer from '@components/common/container/AppContainer';
import TitleNavBar from '@components/common/nav/TitleNavBar';
import Pagination from '@components/common/pagination/Pagination';
import SuperAdminSearchBar from '@components/SuperAdmin/workspace/SuperAdminSearchBar';
import styled from '@emotion/styled';
import { userPaginationResponseAtom } from '@recoils/atoms';
import { useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import SuperAdminWorkspaceContents from './SuperAdminWorkspaceContents';
import useSuperAdminWorkspace from '@hooks/SuperAdmin/useSuperAdminWorkspace';

const ContentContainer = styled.div<{ justifyCenter?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => (props.justifyCenter ? 'center' : 'flex-start')};
  align-items: center;
  height: 550px;
`;

function SuperAdminWorkspace() {
  const userInputRef = useRef<HTMLInputElement | null>(null);
  const workspaces = useRecoilValue(userPaginationResponseAtom);
  const { fetchAllWorkspaces } = useSuperAdminWorkspace();
  const size = 6;
  const emptyWorkspaces = workspaces.numberOfElements === 0;

  useEffect(() => {
    fetchAllWorkspaces(1, size);
  }, []);

  return (
    <AppContainer contentsJustify={'center'} customWidth={'1000px'} customHeight={'100%'} customGap={'20px'}>
      <>
        <TitleNavBar title="전체 워크스페이스 관리" />
        <SuperAdminSearchBar ref={userInputRef} />
        <ContentContainer justifyCenter={emptyWorkspaces}>
          <SuperAdminWorkspaceContents workspaces={workspaces} />
        </ContentContainer>
        <Pagination
          totalPageCount={workspaces.totalPages - 1}
          paginateFunction={(page: number) => {
            fetchAllWorkspaces(page, size, userInputRef.current?.value);
          }}
        />
      </>
    </AppContainer>
  );
}

export default SuperAdminWorkspace;
