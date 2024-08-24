import { WorkspaceList } from '@@types/index';
import useApi from '@hooks/useApi';
import { userWorkspaceListAtom } from '@recoils/atoms';
import { useSetRecoilState } from 'recoil';

interface ParamsType {
  page: number;
  size: number;
  name?: string;
}

function useSuperAdminWorkspace() {
  const { superAdminApi } = useApi();
  const setUserWorkspaceList = useSetRecoilState(userWorkspaceListAtom);

  const fetchAllWorkspaces = (page: number, size: number, name?: string) => {
    const params: ParamsType = { page, size };
    if (name) {
      params.name = name;
    }

    superAdminApi
      .get<WorkspaceList>('/workspaces', { params: params })
      .then((res) => {
        setUserWorkspaceList(res.data);
      })
      .catch((error) => console.error(error));
  };

  return { fetchAllWorkspaces };
}

export default useSuperAdminWorkspace;
