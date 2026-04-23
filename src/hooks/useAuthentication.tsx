import { useNavigate } from 'react-router-dom';
import useApi from '@hooks/useApi';
import { ADMIN_ROUTES } from '@constants/routes';

function useAuthentication() {
  const { userApi } = useApi();
  const navigate = useNavigate();

  const isLoggedIn = () => {
    return localStorage.getItem('isLoggedIn') === 'true';
  };

  const logout = () => {
    return userApi
      .post('/logout')
      .then(() => {
        localStorage.setItem('isLoggedIn', 'false');
      })
      .catch(() => {
        alert('Logout Failed!');
      });
  };

  const login = (id: string, password: string) => {
    userApi
      .post('/login', {
        id,
        password,
      })
      .then(() => {
        localStorage.setItem('isLoggedIn', 'true');
        navigate(ADMIN_ROUTES.HOME);
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
