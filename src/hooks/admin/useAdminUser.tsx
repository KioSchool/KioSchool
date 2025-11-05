import useApi from '@hooks/useApi';
import { User, Workspace } from '@@types/index';
import { useNavigate } from 'react-router-dom';
import useAuthentication from '@hooks/useAuthentication';
import { useSetAtom } from 'jotai';
import { adminUserAtom, adminBanksAtom, adminWorkspacesAtom } from 'src/jotai/admin/atoms';
import { USER_ROUTES } from '@constants/routes';

function useAdminUser() {
  const { adminApi } = useApi();
  const { logout } = useAuthentication();
  const setWorkspaces = useSetAtom(adminWorkspacesAtom);
  const setAdminUser = useSetAtom(adminUserAtom);
  const setBanks = useSetAtom(adminBanksAtom);
  const navigate = useNavigate();

  const fetchAdminUser = () => {
    return adminApi
      .get('/user')
      .then((res) => setAdminUser(res.data))
      .catch((error) => console.error('Failed to fetch adminUser:', error));
  };

  const fetchWorkspaces = () => {
    adminApi
      .get<Workspace[]>('/workspaces')
      .then((res) => setWorkspaces(res.data))
      .catch((error) => console.error('Failed to fetch workspaces:', error));
  };

  const createWorkspaces = (name: string, description: string) => {
    adminApi
      .post('/workspace', { name, description })
      .then((res) => {
        setWorkspaces((prev) => [...prev, res.data]);
      })
      .catch((error) => alert(error.response.data.message));
  };

  const leaveWorkspace = (workspaceId: number) => {
    adminApi
      .post('/workspace/leave', { workspaceId })
      .then(() => {
        setWorkspaces((prev) => prev.filter((itm) => itm.id != workspaceId));
      })
      .catch((error) => console.error('Failed to leave workspace: ', error));
  };

  const registerTossAccount = (accountUrl: string) => {
    adminApi
      .post('/toss-account', { accountUrl })
      .then((res) => {
        setAdminUser(res.data);
        alert('계좌 정보가 성공적으로 저장되었습니다.');
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  const deleteUser = async () => {
    await logout();
    adminApi
      .delete('/user')
      .then(() => {
        alert('탈퇴가 완료되었습니다.');
        navigate(USER_ROUTES.HOME);
      })
      .catch((error) => console.error('Failed to delete user: ', error));
  };

  const fetchBanks = () => {
    adminApi
      .get('/banks')
      .then((res) => setBanks(res.data))
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  const registerAccount = async (bankId: number, accountNumber: string, accountHolder: string) => {
    const body = { bankId, accountNumber, accountHolder };

    return adminApi
      .post<User>('/account', body)
      .then((res) => {
        setAdminUser(res.data);
        return res.data;
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  return { fetchWorkspaces, createWorkspaces, leaveWorkspace, registerTossAccount, fetchAdminUser, deleteUser, fetchBanks, registerAccount };
}

export default useAdminUser;
