import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { USER_ROUTES } from '@constants/routes';
import { REDIRECT_URL_PARAM, sanitizeRedirectUrl } from '@utils/redirectUrl';

const AUTH_ERROR_EVENT = 'adminAuthError';

function AuthErrorListener() {
  const navigate = useNavigate();

  const handleAdminAuthError = () => {
    alert('로그인이 필요합니다.');
    localStorage.setItem('isLoggedIn', 'false');

    const currentPath = window.location.pathname + window.location.search + window.location.hash;
    const redirectTo = sanitizeRedirectUrl(currentPath);
    const loginPath = redirectTo ? `${USER_ROUTES.LOGIN}?${REDIRECT_URL_PARAM}=${encodeURIComponent(redirectTo)}` : USER_ROUTES.LOGIN;

    navigate(loginPath);
  };

  useEffect(() => {
    window.addEventListener(AUTH_ERROR_EVENT, handleAdminAuthError);

    return () => {
      window.removeEventListener(AUTH_ERROR_EVENT, handleAdminAuthError);
    };
  }, []);

  return null;
}

export default AuthErrorListener;
