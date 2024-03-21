import useApi from '@hooks/useApi';
import { Workspace } from '@@types/index';
import { useSetRecoilState } from 'recoil';
import { adminUserAtom, workspacesAtom } from '@recoils/atoms';
import { useNavigate } from 'react-router-dom';

function useAdminUser() {
  const { adminApi } = useApi();
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

  const leaveWorkspaces = (id: number) => {
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
      .catch((error) => console.error('Failed to add account: ', error));
  };

  return { isLoggedIn, fetchWorkspaces, createWorkspaces, leaveWorkspaces, registerAccount, fetchAdminUser };
}

export default useAdminUser;
