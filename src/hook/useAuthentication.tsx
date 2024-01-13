import { useNavigate } from 'react-router-dom';
import useApi from './useApi';

function useAuthentication() {
  const { userApi } = useApi();
  const navigate = useNavigate();

  const logout = () => {
    userApi
      .post('/logout')
      .catch(() => {
        alert('Logout Failed!');
      })
      .finally(() => navigate('/'));
  };

  const login = (userId: string, userPassword: string) => {
    userApi
      .post(
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

  return { login, logout };
}

export default useAuthentication;
