import { SuperAdminDashboard } from '@@types/index';
import useApi from '@hooks/useApi';

function useSuperAdminDashboard() {
  const { superAdminApi } = useApi();

  const fetchDashboard = (): Promise<SuperAdminDashboard | null> => {
    return superAdminApi
      .get<SuperAdminDashboard>('/dashboard')
      .then((res) => res.data)
      .catch((error) => {
        console.error(error);
        return null;
      });
  };

  return { fetchDashboard };
}

export default useSuperAdminDashboard;
