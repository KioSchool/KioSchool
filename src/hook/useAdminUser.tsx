import useApi from './useApi';
import { Workspace } from '../type';
import { useSetRecoilState } from 'recoil';
import { workspacesAtom } from '../recoil/atoms';

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

  const createWorkspaces = (sapceName: string) => {
    adminApi
      .post('/workspace', { name: sapceName })
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

  const addAccount = (account: string) => {
    adminApi.post('/admin/user/toss-account', { accountUrl: account }).catch((error) => console.error('Failed to add account: ', error));
  };

  return { isLoggedIn, fetchWorkspaces, createWorkspaces, leaveWorkspaces, addAccount };
}

export default useAdminUser;
