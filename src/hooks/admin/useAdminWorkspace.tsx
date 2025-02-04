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
      .then((res) => {
        setAdminWorkspace(res.data);
        navigate(`/admin/workspace/${workspaceId}`);
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  const createFormData = (parameter: any, files: Array<File | null>) => {
    const data = new FormData();
    data.append('body', new Blob([JSON.stringify(parameter)], { type: 'application/json' }));

    files.forEach((file) => {
      if (file) {
        data.append('imageFiles', file, file.name);
      }
    });

    return data;
  };

  const updateWorkspaceImage = (workspaceId: number, imageIds: Array<number | null>, imageFiles: Array<File | null>) => {
    const data = createFormData({ workspaceId, imageIds }, imageFiles);

    adminApi
      .put<Workspace>('/workspace/image', data)
      .then((res) => setAdminWorkspace(res.data))
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  return { fetchWorkspace, updateWorkspaceTableCount, updateWorkspaceInfo, updateWorkspaceImage };
}

export default useAdminWorkspace;
