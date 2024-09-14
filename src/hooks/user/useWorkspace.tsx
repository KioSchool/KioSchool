import useApi from '@hooks/useApi';
import { Workspace } from '@@types/index';
import { userWorkspaceAtom } from '@recoils/atoms';
import { useSetRecoilState } from 'recoil';

function useWorkspace() {
  const { userApi } = useApi();
  const setUserWorkspace = useSetRecoilState(userWorkspaceAtom);

  const fetchWorkspace = (workspaceId: string | undefined | null) => {
    if (!workspaceId) return;

    userApi.get<Workspace>('/workspace', { params: { workspaceId: workspaceId } }).then((res) => {
      setUserWorkspace(res.data);
    });
  };

  const fetchWorkspaceAccount = async (workspaceId: string | undefined | null) => {
    if (!workspaceId) return;

    return userApi.get<string>('/workspace/account', { params: { workspaceId: workspaceId } }).then((res) => {
      return res.data;
    });
  };

  return { fetchWorkspace, fetchWorkspaceAccount };
}

export default useWorkspace;
