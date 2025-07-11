import axios, { AxiosResponse, HttpStatusCode, InternalAxiosRequestConfig } from 'axios';
import { useSetAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { isLoadingAtom } from 'src/jotai/atoms';

const ENVIRONMENT = import.meta.env.VITE_ENVIRONMENT;

function useApi() {
  const navigate = useNavigate();
  const setIsLoading = useSetAtom(isLoadingAtom);
  const controller = new AbortController();
  const map = new Map();

  const startLoading = (key: InternalAxiosRequestConfig<any>) => {
    const timeOutId = setTimeout(() => {
      setIsLoading(true);
    }, 500);

    map.set(key, timeOutId);
  };

  const stopLoading = (key: InternalAxiosRequestConfig<any>) => {
    const timeOutId = map.get(key);
    map.delete(key);
    clearTimeout(timeOutId);

    if (!map.size) setIsLoading(false);
  };

  const adminApi = axios.create({
    baseURL: ENVIRONMENT == 'development' ? 'http://localhost:8080/admin' : 'https://api.kio-school.com/admin',
    withCredentials: true,
    signal: controller.signal,
  });

  const commonRequestInterceptor = (config: InternalAxiosRequestConfig<any>) => {
    startLoading(config);
    return config;
  };

  const commonResponseInterceptor = (response: AxiosResponse<any, any>) => {
    stopLoading(response.config);
    return response;
  };

  const commonErrorInterceptor = (error: any) => {
    stopLoading(error.config);
    return Promise.reject(error);
  };

  adminApi.interceptors.request.use(commonRequestInterceptor, commonErrorInterceptor);
  adminApi.interceptors.response.use(commonResponseInterceptor, (error) => {
    stopLoading(error.config);

    if (error.response.status === HttpStatusCode.Forbidden) {
      controller.abort();
      alert('로그인이 필요합니다.');
      localStorage.setItem('isLoggedIn', 'false');
      navigate('/login');
    }

    return Promise.reject(error);
  });

  const userApi = axios.create({
    baseURL: ENVIRONMENT == 'development' ? 'http://localhost:8080' : 'https://api.kio-school.com',
    withCredentials: true,
  });
  userApi.interceptors.request.use(commonRequestInterceptor, commonErrorInterceptor);
  userApi.interceptors.response.use(commonResponseInterceptor, commonErrorInterceptor);

  const superAdminApi = axios.create({
    baseURL: ENVIRONMENT == 'development' ? 'http://localhost:8080/super-admin' : 'https://api.kio-school.com/super-admin',
    withCredentials: true,
    signal: controller.signal,
  });

  superAdminApi.interceptors.request.use(commonRequestInterceptor, commonErrorInterceptor);
  superAdminApi.interceptors.response.use(commonResponseInterceptor, (error) => {
    stopLoading(error.config);

    if (error.response.status === HttpStatusCode.Forbidden) {
      controller.abort();
      alert('권한이 없습니다.');
      navigate('/');
    }

    return Promise.reject(error);
  });

  return { adminApi, userApi, superAdminApi };
}

export default useApi;
