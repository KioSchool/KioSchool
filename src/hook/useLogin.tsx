import { useNavigate } from 'react-router-dom';
import useApi from './useApi';

function useLogin() {
  const { userApi } = useApi();
  const navigate = useNavigate();

  const login = (userId: string, userPassword: string) => {
    userApi
      .post<any>(
        '/login',
        {
          id: userId,
          password: userPassword,
        },
        {
          withCredentials: true,
        },
      )
      .then(() => {
        navigate('/admin');
      })
      .catch(() => {
        alert('Login Failed!');
      });
  };

  return { login };
}

export default useLogin;
