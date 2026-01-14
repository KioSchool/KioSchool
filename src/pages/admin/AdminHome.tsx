import { useEffect } from 'react';
import useAdminUser from '@hooks/admin/useAdminUser';
import AppContainer from '@components/common/container/AppContainer';
import AddWorkspace from '@components/common/workspace/AddWorkspace';
import WorkspaceContent from '@components/admin/workspace/WorkspaceContent';
import { rowFlex } from '@styles/flexStyles';
import { useAtomValue } from 'jotai';
import { adminUserAtom, adminWorkspacesAtom } from '@jotai/admin/atoms';
import AppFaqButton from '@components/common/button/AppFaqButton';
import { useNavigate } from 'react-router-dom';
import { ADMIN_ROUTES } from '@constants/routes';

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
        navigate(ADMIN_ROUTES.REGISTER_ACCOUNT);
      }
    });
  }, []);

  return (
    <AppContainer useFlex={rowFlex({ justify: 'center', align: 'center' })} customGap={'30px'}>
      <>
        <WorkspaceContent workspaces={workspaces} />
        {Array.from({ length: addWorkspaceNumber }).map((_, i) => (
          <AddWorkspace key={i} workspaces={workspaces} />
        ))}
        <AppFaqButton />
      </>
    </AppContainer>
  );
}

export default AdminHome;
