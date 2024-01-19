import useApi from './useApi';
import { Workspace } from '../type';
import { useSetRecoilState } from 'recoil';
import { workspacesAtom } from '../recoil/atoms';

function useUser() {
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
    adminApi.post('/workspace', { name: sapceName }).catch((error) => console.error('Failed to create workspace: ', error));
  };

  return { isLoggedIn, fetchWorkspaces, createWorkspaces };
}

export default useUser;
