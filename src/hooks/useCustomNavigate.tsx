import { useLocation, useNavigate } from 'react-router-dom';

function useCustomNavigate() {
  const location = useLocation();
  const navigate = useNavigate();

  const appendPath = (path: string) => {
    const url = location.pathname.replace(/\/$/, '') + path;
    navigate(url);
  };

  return { appendPath };
}

export default useCustomNavigate;
