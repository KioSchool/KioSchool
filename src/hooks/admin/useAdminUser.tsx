import useApi from '@hooks/useApi';
import { Workspace } from '@@types/index';
import { useSetRecoilState } from 'recoil';
import { adminUserAtom, workspacesAtom } from '@recoils/atoms';
import { useNavigate } from 'react-router-dom';
import useAuthentication from '@hooks/useAuthentication';

function useAdminUser() {
  const { adminApi } = useApi();
  const { logout } = useAuthentication();
  const setWorkspaces = useSetRecoilState(workspacesAtom);
  const setAdminUser = useSetRecoilState(adminUserAtom);
  const navigate = useNavigate();

  const isLoggedIn = () => {
    adminApi.get('/user');
    return true;
  };

  const fetchAdminUser = () => {
    adminApi
      .get('/user')
      .then((res) => setAdminUser(res.data))
      .catch((error) => console.error('Failed to fetch adminUser:', error));
  };

  const fetchWorkspaces = () => {
    adminApi
      .get<Workspace[]>('/workspaces')
      .then((res) => setWorkspaces(res.data))
      .catch((error) => console.error('Failed to fetch workspaces:', error));
  };

  const createWorkspaces = (name: string, description: string) => {
    adminApi
      .post('/workspace', { name: name, description: description })
      .then((res) => {
        setWorkspaces((prev) => [...prev, res.data]);
      })
      .catch((error) => console.error('Failed to create workspace: ', error));
  };

  const leaveWorkspace = (id: number) => {
    adminApi
      .post('/workspace/leave', { workspaceId: id as unknown as string })
      .then(() => {
        setWorkspaces((prev) => prev.filter((itm) => itm.id != id));
      })
      .catch((error) => console.error('Failed to leave workspace: ', error));
  };

  const registerAccount = (account: string) => {
    adminApi
      .post('/user/toss-account', { accountUrl: account })
      .then((res) => {
        setAdminUser(res.data);
        alert('계좌 정보가 성공적으로 저장되었습니다.');
        navigate('/admin');
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  const deleteUser = async () => {
    await logout();
    adminApi
      .delete('/user')
      .then(() => {
        alert('탈퇴가 완료되었습니다.');
        navigate('/');
      })
      .catch((error) => console.error('Failed to delete user: ', error));
  };

  return { isLoggedIn, fetchWorkspaces, createWorkspaces, leaveWorkspace, registerAccount, fetchAdminUser, deleteUser };
}

export default useAdminUser;
