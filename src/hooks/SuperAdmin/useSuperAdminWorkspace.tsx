import useApi from '@hooks/useApi';
import { userWorkspaceListAtom } from '@recoils/atoms';
import { useSetRecoilState } from 'recoil';

function useSuperAdminWorkspace() {
  const { superAdminApi } = useApi();
  const setUserWorkspaceList = useSetRecoilState(userWorkspaceListAtom);

  const fetchAllWorkspaces = (page: number, size: number) => {
    superAdminApi
      .get<any>('/workspaces', { params: { page: page, size: size } })
      .then((res) => {
        setUserWorkspaceList(res.data);
      })
      .catch((error) => console.error(error));
  };

  return { fetchAllWorkspaces };
}

export default useSuperAdminWorkspace;
