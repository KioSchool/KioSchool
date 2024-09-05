import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { isLoadingAtom } from '@recoils/atoms';

function useApi() {
  const navigate = useNavigate();
  const setIsLoading = useSetRecoilState(isLoadingAtom);
  const controller = new AbortController();
  const map = new Map();

  const adminApi = axios.create({
    baseURL: process.env.REACT_APP_ENVIRONMENT == 'development' ? 'http://localhost:8080/admin' : 'https://kio-school.fly.dev/admin',
    withCredentials: true,
    signal: controller.signal,
  });

  const commonRequestInterceptor = (config: any) => {
    const timeoutId = setTimeout(() => {
      setIsLoading(true);
    }, 500);
    map.set(config, timeoutId);
    return config;
  };

  const commonResponseInterceptor = (response: any) => {
    const timeoutId = map.get(response.config);
    clearTimeout(timeoutId);
    setIsLoading(false);
    return response;
  };

  const commonErrorInterceptor = (error: any) => {
    const timeoutId = map.get(error.config);
    clearTimeout(timeoutId);
    setIsLoading(false);
    return Promise.reject(error);
  };

  adminApi.interceptors.request.use(commonRequestInterceptor, commonErrorInterceptor);
  adminApi.interceptors.response.use(commonResponseInterceptor, (error) => {
    const timeoutId = map.get(error.config);
    clearTimeout(timeoutId);
    if (error.response.status === 403) {
      controller.abort();
      alert('로그인이 필요합니다.');
      document.cookie = 'isLoggedIn=;';
      navigate('/login');
    }

    return Promise.reject(error);
  });

  const userApi = axios.create({
    baseURL: process.env.REACT_APP_ENVIRONMENT == 'development' ? 'http://localhost:8080' : 'https://kio-school.fly.dev',
    withCredentials: true,
  });
  userApi.interceptors.request.use(commonRequestInterceptor, commonErrorInterceptor);
  userApi.interceptors.response.use(commonResponseInterceptor, commonErrorInterceptor);

  const superAdminApi = axios.create({
    baseURL: process.env.REACT_APP_ENVIRONMENT == 'development' ? 'http://localhost:8080/super-admin' : 'https://kio-school.fly.dev/super-admin',
    withCredentials: true,
    signal: controller.signal,
  });

  superAdminApi.interceptors.request.use(commonRequestInterceptor, commonErrorInterceptor);
  superAdminApi.interceptors.response.use(commonResponseInterceptor, (error) => {
    const timeoutId = map.get(error.config);
    clearTimeout(timeoutId);
    if (error.response.status === 403) {
      controller.abort();
      alert('권한이 없습니다.');
      navigate('/');
    }

    return Promise.reject(error);
  });

  return { adminApi, userApi, superAdminApi };
}

export default useApi;
