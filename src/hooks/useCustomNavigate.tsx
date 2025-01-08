import { useLocation, useNavigate } from 'react-router-dom';

function useCustomNavigate() {
  const location = useLocation();
  const navigate = useNavigate();

  const appendPath = (path: string) => {
    const url = location.pathname.replace(/\/$/, '') + path;
    navigate(url);
  };

  const replaceLastPath = (path: string) => {
    const url = location.pathname.replace(/\/[^/]*$/, '') + path;
    navigate(url);
  };

  const navigateWithPage = (path: string, additionalParams = {}) => {
    const params = new URLSearchParams({ page: '0', ...additionalParams });
    navigate(`${path}?${params.toString()}`);
  };

  return { appendPath, replaceLastPath, navigateWithPage };
}

export default useCustomNavigate;
