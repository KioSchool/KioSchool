import AppContainer from '@components/common/container/AppContainer';
import TitleNavBar from '@components/common/nav/TitleNavBar';
import Pagination from '@components/common/pagination/Pagination';
import SuperAdminWorkspaceContent from '@components/SuperAdmin/workspace/SuperAdminWorkspaceContent';
import styled from '@emotion/styled';
import { userWorkspaceListAtom } from '@recoils/atoms';
import { useRecoilValue } from 'recoil';

const HorizontalLine = styled.hr`
  width: 100%;
  border: 0.3px solid #d8d8d8;
`;

function SuperAdminWorkspace() {
  const workspaces = useRecoilValue(userWorkspaceListAtom);

  return (
    <AppContainer justifyValue="center" customWidth="1000px" customHeight="100%">
      <>
        <TitleNavBar title="전체 워크스페이스 관리" />
        {workspaces.content.map((item, index) => {
          return (
            <>
              <SuperAdminWorkspaceContent {...item} key={item.id} />
              {index < workspaces.content.length - 1 && <HorizontalLine key={index} />}
            </>
          );
        })}
        <Pagination totalPageCount={workspaces.totalPages - 1} />
      </>
    </AppContainer>
  );
}

export default SuperAdminWorkspace;
