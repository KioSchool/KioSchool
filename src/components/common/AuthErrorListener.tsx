import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AuthErrorListener() {
  const navigate = useNavigate();

  const handleAdminAuthError = () => {
    alert('로그인이 필요합니다.');
    localStorage.setItem('isLoggedIn', 'false');
    navigate('/login');
  };

  useEffect(() => {
    window.addEventListener('adminAuthError', handleAdminAuthError);

    return () => {
      window.removeEventListener('adminAuthError', handleAdminAuthError);
    };
  }, []);

  return null;
}

export default AuthErrorListener;
