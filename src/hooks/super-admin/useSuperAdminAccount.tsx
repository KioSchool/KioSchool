import { useCallback } from 'react';
import { AccountConnectionStatus } from '@@types/index';
import useApi from '@hooks/useApi';

function useSuperAdminAccount() {
  const { superAdminApi } = useApi();

  const fetchAccountConnectionStatus = useCallback((): Promise<AccountConnectionStatus | null> => {
    return superAdminApi
      .get<AccountConnectionStatus>('/account-status')
      .then((res) => res.data)
      .catch((error) => {
        console.error(error);
        return null;
      });
  }, [superAdminApi]);

  return { fetchAccountConnectionStatus };
}

export default useSuperAdminAccount;
