import AppContainer from '@components/common/container/AppContainer';
import TitleNavBar from '@components/common/nav/TitleNavBar';
import Pagination from '@components/common/pagination/Pagination';
import SuperAdminSearchBar from '@components/SuperAdmin/workspace/SuperAdminSearchBar';
import SuperAdminWorkspaceContent from '@components/SuperAdmin/workspace/SuperAdminWorkspaceContent';
import styled from '@emotion/styled';
import { userWorkspaceListAtom } from '@recoils/atoms';
import { useRecoilValue } from 'recoil';

const HorizontalLine = styled.hr`
  width: 100%;
  border: 0.3px solid #eeecec;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 500px;
`;

function SuperAdminWorkspace() {
  const workspaces = useRecoilValue(userWorkspaceListAtom);

  return (
    <AppContainer justifyValue="center" customWidth="1000px" customHeight="100%" customGap="20px">
      <>
        <TitleNavBar title="전체 워크스페이스 관리" />
        <SuperAdminSearchBar />
        <ContentContainer>
          {workspaces.content.map((item, index) => {
            return (
              <>
                <SuperAdminWorkspaceContent {...item} key={item.id} />
                {index < workspaces.content.length - 1 && <HorizontalLine key={index} />}
              </>
            );
          })}
        </ContentContainer>
        <Pagination totalPageCount={workspaces.totalPages - 1} />
      </>
    </AppContainer>
  );
}

export default SuperAdminWorkspace;
