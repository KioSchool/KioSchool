import useApi from '@hooks/useApi';
import { userWorkspaceListAtom } from '@recoils/atoms';
import { useSetRecoilState } from 'recoil';

function useSuperAdminWorkspace() {
  const { superAdminApi } = useApi();
  const setUserWorkspaceList = useSetRecoilState(userWorkspaceListAtom);

  const fetchAllWorkspaces = (page: number, size: number, name?: string) => {
    superAdminApi
      .get<any>('/workspaces', { params: { page: page, size: size, name: name } })
      .then((res) => {
        setUserWorkspaceList(res.data);
      })
      .catch((error) => console.error(error));
  };

  return { fetchAllWorkspaces };
}

export default useSuperAdminWorkspace;
