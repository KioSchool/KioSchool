import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { isLoadingAtom } from '@recoils/atoms';

interface UseApiProps {
  useLoading?: boolean;
}

function useApi({ useLoading = true }: UseApiProps = {}) {
  const navigate = useNavigate();
  const setIsLoading = useSetRecoilState(isLoadingAtom);
  const controller = new AbortController();

  const adminApi = axios.create({
    baseURL: process.env.REACT_APP_ENVIRONMENT == 'development' ? 'http://localhost:8080/admin' : 'https://kio-school.fly.dev/admin',
    withCredentials: true,
    signal: controller.signal,
  });

  const commonRequestInterceptor = (config: any) => {
    if (useLoading) setIsLoading(true);
    return config;
  };

  const commonResponseInterceptor = (response: any) => {
    if (useLoading) setIsLoading(false);
    return response;
  };

  const commonErrorInterceptor = (error: any) => {
    if (useLoading) setIsLoading(false);
    return Promise.reject(error);
  };

  adminApi.interceptors.request.use(commonRequestInterceptor, commonErrorInterceptor);
  adminApi.interceptors.response.use(commonResponseInterceptor, (error) => {
    if (useLoading) setIsLoading(false);
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
    if (useLoading) setIsLoading(false);
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
