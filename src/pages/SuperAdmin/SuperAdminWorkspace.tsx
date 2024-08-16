import AppContainer from '@components/common/container/AppContainer';
import TitleNavBar from '@components/common/nav/TitleNavBar';
import SuperAdminWorkspaceContent from '@components/SuperAdmin/workspace/SuperAdminWorkspaceContent';
import styled from '@emotion/styled';
import useSuperAdminWorkspace from '@hooks/SuperAdmin/useSuperAdminWorkspace';
import { userWorkspaceListAtom } from '@recoils/atoms';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';

const HorizontalLine = styled.hr`
  width: 100%;
  border: 0.3px solid #d8d8d8;
`;

function SuperAdminWorkspace() {
  const { fetchAllWorkspaces } = useSuperAdminWorkspace();
  const workspaces = useRecoilValue(userWorkspaceListAtom);

  useEffect(() => {
    fetchAllWorkspaces(1, 6);
  }, []);

  return (
    <AppContainer justifyValue="center" customWidth="1000px">
      <>
        <TitleNavBar title="전체 워크스페이스 관리" />
        {workspaces.content.map((item, index) => {
          console.log(item);
          return (
            <>
              <SuperAdminWorkspaceContent {...item} key={item.id} />
              {index < workspaces.content.length - 1 && <HorizontalLine />}
            </>
          );
        })}
      </>
    </AppContainer>
  );
}

export default SuperAdminWorkspace;
