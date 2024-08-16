import AppContainer from '@components/common/container/AppContainer';
import TitleNavBar from '@components/common/nav/TitleNavBar';
import useSuperAdminWorkspace from '@hooks/SuperAdmin/useSuperAdminWorkspace';
import { useEffect } from 'react';

function SuperAdminWorkspace() {
  const { fetchAllWorkspaces } = useSuperAdminWorkspace();
  useEffect(() => {
    fetchAllWorkspaces(1, 6);
  }, []);
  return (
    <AppContainer justifyValue="center" customWidth="1000px">
      <TitleNavBar title="전체 워크스페이스 관리" />
    </AppContainer>
  );
}

export default SuperAdminWorkspace;
