import useApi from '@hooks/useApi';
import { Account, Workspace } from '@@types/index';
import { userWorkspaceAccountsAtom, userWorkspaceAtom } from '@jotai/user/atoms';
import { useSetAtom } from 'jotai';

function useWorkspace() {
  const { userApi } = useApi();
  const setUserWorkspace = useSetAtom(userWorkspaceAtom);
  const setUserWorkspaceAccounts = useSetAtom(userWorkspaceAccountsAtom);

  const fetchWorkspace = (workspaceId: string | undefined | null) => {
    if (!workspaceId) return;

    userApi.get<Workspace>('/workspace', { params: { workspaceId } }).then((res) => {
      setUserWorkspace(res.data);
    });
  };

  const fetchWorkspaceAccount = async (workspaceId: string | undefined | null) => {
    if (!workspaceId) return;

    return userApi.get<Account>('/workspace/account', { params: { workspaceId } }).then((res) => {
      // 계좌가 없으면 빈 본문이 온다
      setUserWorkspaceAccounts((accounts) => ({ ...accounts, [workspaceId]: res.data || null }));
      return res.data;
    });
  };

  return { fetchWorkspace, fetchWorkspaceAccount };
}

export default useWorkspace;
