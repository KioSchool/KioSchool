import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function useApi() {
  const navigate = useNavigate();

  const adminApi = axios.create({
    baseURL: process.env.REACT_APP_ENVIRONMENT == 'development' ? 'http://localhost:8080/admin' : 'https://kio-school.fly.dev/admin',
    withCredentials: true,
  });

  adminApi.interceptors.response.use(
    (response) => response,
    (error) => {
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

  return { adminApi, userApi };
}

export default useApi;
