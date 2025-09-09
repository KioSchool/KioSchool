import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AUTH_ERROR_EVENT = 'adminAuthError';

function AuthErrorListener() {
  const navigate = useNavigate();

  const handleAdminAuthError = () => {
    alert('로그인이 필요합니다.');
    localStorage.setItem('isLoggedIn', 'false');
    navigate('/login');
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
