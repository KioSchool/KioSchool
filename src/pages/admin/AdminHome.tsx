import { useEffect } from 'react';
import useAdminUser from '@hooks/admin/useAdminUser';
import AppContainer from '@components/common/container/AppContainer';
import AddWorkspace from '@components/common/workspace/AddWorkspace';
import WorkspaceContent from '@components/admin/workspace/WorkspaceContent';
import AppFooter from '@components/common/footer/AppFooter';
import { rowFlex } from '@styles/flexStyles';
import { useAtomValue } from 'jotai';
import { adminUserAtom, adminWorkspacesAtom } from 'src/jotai/admin/atoms';
import AppFaqButton from '@components/common/button/AppFaqButton';
import { useNavigate } from 'react-router-dom';

function AdminHome() {
  const navigate = useNavigate();
  const { fetchWorkspaces, fetchAdminUser } = useAdminUser();
  const workspaces = useAtomValue(adminWorkspacesAtom);
  const user = useAtomValue(adminUserAtom);
  const addWorkspaceNumber = 3 - workspaces.length;

  useEffect(() => {
    fetchWorkspaces();
    fetchAdminUser().then(() => {
      if (!user.account) {
        alert('계좌 정보가 등록되어 있지 않습니다. 계좌 정보를 등록해주세요.');
        navigate('/admin/register-account');
      }
    });
  }, []);

  return (
    <AppContainer useFlex={rowFlex({ justify: 'space-between' })} titleNavBarProps={{ title: `${user.name}님의 주점`, useBackIcon: false }}>
      <>
        <WorkspaceContent workspaces={workspaces} />
        {Array.from({ length: addWorkspaceNumber }).map((_, i) => (
          <AddWorkspace key={i} workspaces={workspaces} />
        ))}
        <AppFooter />
        <AppFaqButton />
      </>
    </AppContainer>
  );
}

export default AdminHome;
