import useApi from '@hooks/useApi';
import { useSetRecoilState } from 'recoil';
import { adminWorkspaceAtom } from '@recoils/atoms';
import { Workspace } from '@@types/index';
import { useNavigate } from 'react-router-dom';

function useAdminWorkspace() {
  const { adminApi } = useApi();
  const setAdminWorkspace = useSetRecoilState(adminWorkspaceAtom);

  const navigate = useNavigate();

  const fetchWorkspace = (workspaceId: string | undefined | null) => {
    if (!workspaceId) return;

    adminApi
      .get<Workspace>('/workspace', { params: { workspaceId } })
      .then((res) => {
        setAdminWorkspace(res.data);
      })
      .catch((error) => {
        alert(error.response.data.message);
        navigate(-1);
      });
  };

  const updateWorkspaceTableCount = (workspaceId: string | undefined | null, tableCount: number) => {
    adminApi
      .post<Workspace>('/workspace/table-count', { workspaceId, tableCount })
      .then((res) => {
        setAdminWorkspace(res.data);
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  const updateWorkspaceInfo = (workspaceId: number, name: string, description: string, notice?: string) => {
    adminApi
      .put<Workspace>('/workspace/info', {
        workspaceId,
        name,
        description,
        notice,
      })
      .then((res) => setAdminWorkspace(res.data))
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  return { fetchWorkspace, updateWorkspaceTableCount, updateWorkspaceInfo };
}

export default useAdminWorkspace;
