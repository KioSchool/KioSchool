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

  return { fetchWorkspace };
}

export default useAdminWorkspace;
