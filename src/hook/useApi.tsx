import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { isLoadingAtom } from '../recoil/atoms';

function useApi() {
  const navigate = useNavigate();
  const setIsLoading = useSetRecoilState(isLoadingAtom);

  const adminApi = axios.create({
    baseURL: process.env.REACT_APP_ENVIRONMENT == 'development' ? 'http://localhost:8080/admin' : 'https://kio-school.fly.dev/admin',
    withCredentials: true,
  });

  const sessionApi = axios.create({
    baseURL: process.env.REACT_APP_ENVIRONMENT == 'development' ? 'http://localhost:8080/admin' : 'https://kio-school.fly.dev/admin',
    withCredentials: true,
  });

  adminApi.interceptors.request.use(
    (config) => {
      setIsLoading(true);
      return config;
    },
    (error) => {
      setIsLoading(false);
      return Promise.reject(error);
    },
  );

  adminApi.interceptors.response.use(
    (response) => {
      setIsLoading(false);
      return response;
    },
    (error) => {
      setIsLoading(false);
      if (error.response.status === 403) {
        alert('로그인이 필요합니다.');
        navigate('/login');
      }
      return Promise.reject(error);
    },
  );

  const userApi = axios.create({
    baseURL: process.env.REACT_APP_ENVIRONMENT == 'development' ? 'http://localhost:8080' : 'https://kio-school.fly.dev',
    withCredentials: true,
  });

  userApi.interceptors.request.use(
    (config) => {
      setIsLoading(true);
      return config;
    },
    (error) => {
      setIsLoading(false);
      return Promise.reject(error);
    },
  );

  userApi.interceptors.response.use(
    (response) => {
      setIsLoading(false);
      return response;
    },
    (error) => {
      setIsLoading(false);
      return Promise.reject(error);
    },
  );

  return { adminApi, userApi, sessionApi };
}

export default useApi;
