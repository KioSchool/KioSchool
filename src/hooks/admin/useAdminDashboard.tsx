import useApi from '@hooks/useApi';
import { DashboardResponse } from '@@types/index';
import { adminDashboardAtom } from '@jotai/admin/atoms';
import { useSetAtom } from 'jotai';

function useAdminDashboard() {
  const { adminApi } = useApi();
  const setAdminDashboard = useSetAtom(adminDashboardAtom);

  const fetchDashboard = (workspaceId: string | undefined | null) => {
    if (!workspaceId) return;

    return adminApi
      .get<DashboardResponse>('/dashboard', { params: { workspaceId } })
      .then((res) => {
        setAdminDashboard(res.data);
      })
      .catch((error) => {
        console.error(error.response.data.message);
      });
  };

  return { fetchDashboard };
}

export default useAdminDashboard;
