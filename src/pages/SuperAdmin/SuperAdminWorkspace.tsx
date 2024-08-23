import AppContainer from '@components/common/container/AppContainer';
import TitleNavBar from '@components/common/nav/TitleNavBar';
import Pagination from '@components/common/pagination/Pagination';
import SuperAdminSearchBar from '@components/SuperAdmin/workspace/SuperAdminSearchBar';
import styled from '@emotion/styled';
import { userWorkspaceListAtom } from '@recoils/atoms';
import { useRef } from 'react';
import { useRecoilValue } from 'recoil';
import SuperAdminWorkspaceContents from './SuperAdminWorkspaceContents';

const ContentContainer = styled.div<{ justifyCenter?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => (props.justifyCenter ? 'flex-start' : 'center')};
  align-items: center;
  height: 550px;
`;

function SuperAdminWorkspace() {
  const userInputRef = useRef<HTMLInputElement | null>(null);
  const workspaces = useRecoilValue(userWorkspaceListAtom);

  return (
    <AppContainer justifyValue={'center'} customWidth={'1000px'} customHeight={'100%'} customGap={'20px'}>
      <>
        <TitleNavBar title="전체 워크스페이스 관리" />
        <SuperAdminSearchBar ref={userInputRef} />
        <ContentContainer justifyCenter={workspaces.numberOfElements > 0}>
          <SuperAdminWorkspaceContents workspaces={workspaces} />
        </ContentContainer>
        <Pagination totalPageCount={workspaces.totalPages - 1} name={userInputRef.current?.value} />
      </>
    </AppContainer>
  );
}

export default SuperAdminWorkspace;
