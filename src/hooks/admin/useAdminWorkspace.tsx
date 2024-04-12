import useApi from '@hooks/useApi';
import { useSetRecoilState } from 'recoil';
import { userWorkspaceAtom } from '@recoils/atoms';
import { Workspace } from '@@types/index';

function ueAdminWorkspace() {
  const { adminApi } = useApi();
  const setUserWorkspace = useSetRecoilState(userWorkspaceAtom);

  const fetchWorkspace = (workspaceId: string | undefined | null) => {
    if (!workspaceId) return;

    adminApi.get<Workspace>('/workspace', { params: { workspaceId: workspaceId } }).then((res) => {
      setUserWorkspace(res.data);
    });
  };

  return { fetchWorkspace };
}

export default ueAdminWorkspace;
