import useApi from '@hooks/useApi';
import { User, Workspace } from '@@types/index';
import { trackEvent } from '@utils/analytics';
import { getApiErrorMessage } from '@utils/apiError';
import { GA_EVENT } from '@constants/analytics';
import { useNavigate } from 'react-router-dom';
import useAuthentication from '@hooks/useAuthentication';
import { useSetAtom } from 'jotai';
import { adminUserAtom, adminBanksAtom, adminWorkspacesAtom } from '@jotai/admin/atoms';
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
      .post<Workspace>('/workspace', { name, description })
      .then((res) => {
        setWorkspaces((prev) => [...prev, res.data]);
        trackEvent(GA_EVENT.WORKSPACE_CREATED, { workspace_id: res.data.id });
      })
      .catch((error) => alert(getApiErrorMessage(error, '주점을 생성하지 못했습니다. 잠시 후 다시 시도해 주세요.')));
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
    return adminApi
      .post('/toss-account', { accountUrl })
      .then((res) => {
        setAdminUser(res.data);
        alert('계좌 정보가 성공적으로 저장되었습니다.');
        return res.data;
      })
      .catch((error) => {
        alert(getApiErrorMessage(error, '계좌 정보를 저장하지 못했습니다. 잠시 후 다시 시도해 주세요.'));
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
        alert(getApiErrorMessage(error, '은행 목록을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.'));
      });
  };

  const registerAccount = async (bankId: number, accountNumber: string) => {
    const body = { bankId, accountNumber };

    return adminApi
      .post<User>('/account', body)
      .then((res) => {
        setAdminUser(res.data);
        return res.data;
      })
      .catch((error) => {
        alert(getApiErrorMessage(error, '계좌를 등록하지 못했습니다. 잠시 후 다시 시도해 주세요.'));
      });
  };

  const deleteAccount = () => {
    adminApi
      .delete<User>('/account')
      .then((res) => {
        setAdminUser(res.data);
        alert('계좌 삭제가 완료되었습니다.');
      })
      .catch((error) => {
        alert(getApiErrorMessage(error, '계좌를 삭제하지 못했습니다. 잠시 후 다시 시도해 주세요.'));
      });
  };

  const deleteTossAccount = () => {
    adminApi
      .delete<User>('/toss-account')
      .then((res) => {
        setAdminUser(res.data);
        alert('Toss QR 정보 삭제가 완료되었습니다.');
      })
      .catch((error) => {
        alert(getApiErrorMessage(error, 'Toss QR 정보를 삭제하지 못했습니다. 잠시 후 다시 시도해 주세요.'));
      });
  };

  const registerTossAccountAuto = () => {
    adminApi
      .post<User>('/toss-account/auto')
      .then((res) => {
        setAdminUser(res.data);
        alert('토스 계좌가 자동으로 등록되었습니다.');
      })
      .catch((error) => {
        alert(getApiErrorMessage(error, '토스 계좌를 자동으로 등록하지 못했습니다. 잠시 후 다시 시도해 주세요.'));
      });
  };

  return {
    fetchWorkspaces,
    createWorkspaces,
    leaveWorkspace,
    registerTossAccount,
    registerTossAccountAuto,
    fetchAdminUser,
    deleteUser,
    fetchBanks,
    registerAccount,
    deleteAccount,
    deleteTossAccount,
  };
}

export default useAdminUser;
