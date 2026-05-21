import useApi from '@hooks/useApi';

function useSuperAdminCache() {
  const { superAdminApi } = useApi();

  const fetchCacheNames = () => superAdminApi.get<string[]>('/caches');

  const fetchCacheKeys = (cacheName: string) => superAdminApi.get<string[]>(`/cache/${cacheName}/keys`);

  const clearAllCaches = () => superAdminApi.delete<string[]>('/cache');

  const clearCache = (cacheName: string) => superAdminApi.delete<string>(`/cache/${cacheName}`);

  const deleteCacheKey = (cacheName: string, key: string) => superAdminApi.delete<string>(`/cache/${cacheName}/key`, { params: { key } });

  return { fetchCacheNames, fetchCacheKeys, clearAllCaches, clearCache, deleteCacheKey };
}

export default useSuperAdminCache;
