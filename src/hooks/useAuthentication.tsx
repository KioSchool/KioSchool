import { useNavigate } from 'react-router-dom';
import useApi from '@hooks/useApi';

function useAuthentication() {
  const { userApi } = useApi();
  const navigate = useNavigate();

  const isLoggedIn = () => {
    const match = document.cookie.match(new RegExp(`(^| )isLoggedIn=([^;]+)`));
    if (match) return match[2];
  };

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
      .post('/login', {
        id: userId,
        password: userPassword,
      })
      .then(() => {
        navigate('/admin');
      })
      .catch(() => {
        alert('Login Failed!');
      });
  };

  return { login, logout, isLoggedIn };
}

export default useAuthentication;
