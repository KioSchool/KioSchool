import { match } from 'ts-pattern';
import useApi from '@hooks/useApi';
import { PaymentMethod, User, Workspace } from '@@types/index';
import { trackEvent } from '@utils/analytics';
import { getApiErrorMessage } from '@utils/apiError';
import { GA_EVENT } from '@constants/analytics';
import { useNavigate } from 'react-router-dom';
import { useSetAtom } from 'jotai';
import { adminUserAtom, adminBanksAtom, adminWorkspacesAtom } from '@jotai/admin/atoms';
import { USER_ROUTES } from '@constants/routes';

function useAdminUser() {
  const { adminApi } = useApi();
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
    return adminApi
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

  const withdraw = (password: string) => {
    return adminApi.post('/user/withdraw', { password }).then(() => {
      localStorage.setItem('isLoggedIn', 'false');
      alert('탈퇴가 완료되었습니다.');
      navigate(USER_ROUTES.HOME);
    });
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

  const PAY_APP_PATHS: Record<PaymentMethod.TOSS | PaymentMethod.KAKAOPAY, { on: string; off: string }> = {
    [PaymentMethod.TOSS]: { on: '/toss-account/auto', off: '/toss-account' },
    [PaymentMethod.KAKAOPAY]: { on: '/kakaopay-account', off: '/kakaopay-account' },
  };

  const setPayAppEnabled = (method: PaymentMethod.TOSS | PaymentMethod.KAKAOPAY, enabled: boolean) => {
    const { on, off } = PAY_APP_PATHS[method];
    const request = match(enabled)
      .with(true, () => adminApi.post<User>(on))
      .otherwise(() => adminApi.delete<User>(off));
    return request
      .then((res) => {
        setAdminUser(res.data);
      })
      .catch((error) => {
        alert(getApiErrorMessage(error, '송금 방법을 바꾸지 못했어요. 잠시 후 다시 시도해 주세요.'));
      });
  };

  return {
    fetchWorkspaces,
    createWorkspaces,
    leaveWorkspace,
    fetchAdminUser,
    withdraw,
    fetchBanks,
    registerAccount,
    deleteAccount,
    setPayAppEnabled,
  };
}

export default useAdminUser;
