import useApi from '@hooks/useApi';
import { useSetRecoilState } from 'recoil';
import { userWorkspaceAtom } from '@recoils/atoms';
import { Workspace } from '@@types/index';
import { useNavigate } from 'react-router-dom';

function ueAdminWorkspace() {
  const { adminApi } = useApi();
  const setUserWorkspace = useSetRecoilState(userWorkspaceAtom);
  const navigate = useNavigate();

  const fetchWorkspace = (workspaceId: string | undefined | null) => {
    if (!workspaceId) return;

    adminApi
      .get<Workspace>('/workspace', { params: { workspaceId: workspaceId } })
      .then((res) => {
        setUserWorkspace(res.data);
      })
      .catch((error) => {
        alert(error.response.data.message);
        navigate(-1);
      });
  };

  return { fetchWorkspace };
}

export default ueAdminWorkspace;
