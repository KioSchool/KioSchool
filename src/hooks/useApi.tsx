import { adminApiManager } from 'src/apis/adminApi';
import { superAdminApiManager } from 'src/apis/superAdminApi';
import { userApiManager } from 'src/apis/userApi';

function useApi() {
  return { adminApi: adminApiManager.getApi(), userApi: userApiManager.getApi(), superAdminApi: superAdminApiManager.getApi() };
}

export default useApi;
