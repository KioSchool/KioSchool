import useApi from './useApi';
import { Workspace } from '../type';
import { useSetRecoilState } from 'recoil';
import { workspacesAtom } from '../recoil/atoms';
import { useEffect } from 'react';

function useUser() {
  const { adminApi } = useApi();
  const setWorkspaces = useSetRecoilState(workspacesAtom);

  useEffect(() => {
    adminApi.get('/user');
  }, [adminApi]);

  const fetchWorkspaces = () => {
    adminApi
      .get<Workspace[]>('/workspaces')
      .then((res) => setWorkspaces(res.data))
      .catch((error) => console.error('Failed to fetch workspaces:', error));
  };

  return { fetchWorkspaces };
}

export default useUser;
