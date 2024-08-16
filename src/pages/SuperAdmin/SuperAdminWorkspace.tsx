import AppContainer from '@components/common/container/AppContainer';
import TitleNavBar from '@components/common/nav/TitleNavBar';
import SuperAdminWorkspaceContent from '@components/SuperAdmin/workspace/SuperAdminWorkspaceContent';
import useSuperAdminWorkspace from '@hooks/SuperAdmin/useSuperAdminWorkspace';
import { userWorkspaceListAtom } from '@recoils/atoms';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';

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
        {workspaces.content.map((item) => {
          return <SuperAdminWorkspaceContent key={item.id}>{item.name}</SuperAdminWorkspaceContent>;
        })}
      </>
    </AppContainer>
  );
}

export default SuperAdminWorkspace;
