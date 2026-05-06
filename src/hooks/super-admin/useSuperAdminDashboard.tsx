import { useCallback } from 'react';
import { SuperAdminDashboard } from '@@types/index';
import useApi from '@hooks/useApi';

function useSuperAdminDashboard() {
  const { superAdminApi } = useApi();

  const fetchDashboard = useCallback((): Promise<SuperAdminDashboard | null> => {
    return superAdminApi
      .get<SuperAdminDashboard>('/dashboard')
      .then((res) => res.data)
      .catch((error) => {
        console.error(error);
        return null;
      });
  }, [superAdminApi]);

  return { fetchDashboard };
}

export default useSuperAdminDashboard;
