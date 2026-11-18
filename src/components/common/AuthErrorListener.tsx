import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { USER_ROUTES } from '@constants/routes';
import { REDIRECT_URL_PARAM, sanitizeRedirectUrl } from '@utils/redirectUrl';

const AUTH_ERROR_EVENT = 'adminAuthError';

function AuthErrorListener() {
  const navigate = useNavigate();

  const handleAdminAuthError = () => {
    // 동시에 401을 받은 요청들이 같은 토큰 갱신 실패를 기다렸다가 한꺼번에 이벤트를 보내므로, 이미 로그인 화면이면 무시한다
    if (window.location.pathname === USER_ROUTES.LOGIN) return;

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
