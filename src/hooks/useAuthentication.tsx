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
    return userApi
      .post('/logout')
      .then(() => {
        document.cookie = 'isLoggedIn=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      })
      .catch(() => {
        alert('Logout Failed!');
      });
  };

  const login = (userId: string, userPassword: string) => {
    userApi
      .post('/login', {
        id: userId,
        password: userPassword,
      })
      .then(() => {
        document.cookie = 'isLoggedIn=true';
        navigate('/admin');
      })
      .catch(() => {
        alert('Login Failed!');
      });
  };

  const sendResetPasswordLink = (id: string, email: string) => {
    return userApi.post('/user/password', { id, email });
  };

  const resetPassword = (password: string, code: string) => {
    return userApi.post('/user/reset', { password, code });
  };

  return { login, logout, isLoggedIn, sendResetPasswordLink, resetPassword };
}

export default useAuthentication;
