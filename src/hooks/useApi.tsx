import { adminApiManager } from '@apis/adminApi';
import { superAdminApiManager } from '@apis/superAdminApi';
import { userApiManager } from '@apis/userApi';

function useApi() {
  return { adminApi: adminApiManager.getApi(), userApi: userApiManager.getApi(), superAdminApi: superAdminApiManager.getApi() };
}

export default useApi;
