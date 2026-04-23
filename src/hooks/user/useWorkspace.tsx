import useApi from '@hooks/useApi';
import { Account, Workspace } from '@@types/index';
import { userWorkspaceAtom } from '@jotai/user/atoms';
import { useSetAtom } from 'jotai';

function useWorkspace() {
  const { userApi } = useApi();
  const setUserWorkspace = useSetAtom(userWorkspaceAtom);

  const fetchWorkspace = (workspaceId: string | undefined | null) => {
    if (!workspaceId) return;

    userApi.get<Workspace>('/workspace', { params: { workspaceId } }).then((res) => {
      setUserWorkspace(res.data);
    });
  };

  const fetchWorkspaceAccount = async (workspaceId: string | undefined | null) => {
    if (!workspaceId) return;

    return userApi.get<Account>('/workspace/account', { params: { workspaceId } }).then((res) => {
      return res.data;
    });
  };

  return { fetchWorkspace, fetchWorkspaceAccount };
}

export default useWorkspace;
