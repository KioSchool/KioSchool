import useApi from '@hooks/useApi';
import { Workspace } from '@@types/index';
import { useSetRecoilState } from 'recoil';
import { workspacesAtom } from '@recoils/atoms';

function useAdminUser() {
  const { adminApi } = useApi();
  const setWorkspaces = useSetRecoilState(workspacesAtom);

  const isLoggedIn = () => {
    adminApi.get('/user');
    return true;
  };

  const fetchWorkspaces = () => {
    adminApi
      .get<Workspace[]>('/workspaces')
      .then((res) => setWorkspaces(res.data))
      .catch((error) => console.error('Failed to fetch workspaces:', error));
  };

  const createWorkspaces = (name: string) => {
    adminApi
      .post('/workspace', { name: name })
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
    adminApi.post('/user/toss-account', { accountUrl: account }).catch((error) => console.error('Failed to add account: ', error));
  };

  return { isLoggedIn, fetchWorkspaces, createWorkspaces, leaveWorkspaces, registerAccount };
}

export default useAdminUser;
