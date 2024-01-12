import useApi from './useApi';
import { Workspace } from '../type';
import { useSetRecoilState } from 'recoil';
import { workspacesAtom } from '../recoil/atoms';
import { useState, useEffect } from 'react';

function useUser() {
  const { adminApi } = useApi();
  const setWorkspaces = useSetRecoilState(workspacesAtom);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    adminApi
      .get('/user')
      .then(() => setIsLoggedIn(true))
      .catch((error) => {
        console.error('error! -> ' + error);
        setIsLoggedIn(false);
      });
  }, [adminApi]);

  const fetchWorkspaces = () => {
    adminApi
      .get<Workspace[]>('/workspaces')
      .then((res) => setWorkspaces(res.data))
      .catch((error) => console.error('Failed to fetch workspaces:', error));
  };

  return { isLoggedIn, fetchWorkspaces };
}

export default useUser;
