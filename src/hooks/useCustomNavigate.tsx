import { useLocation, useNavigate } from 'react-router-dom';

function useCustomNavigate() {
  const location = useLocation();
  const navigate = useNavigate();

  const appendPath = (path: string) => {
    const url = location.pathname.replace(/\/$/, '') + path;
    navigate(url);
  };

  const appendPathWithPage = (path: string, additionalParams = {}) => {
    const params = new URLSearchParams({ page: '0', ...additionalParams });
    const url = location.pathname.replace(/\/$/, '') + path;
    navigate({ pathname: url, search: params.toString() });
  };

  const replaceLastPath = (path: string) => {
    const url = location.pathname.replace(/\/[^/]*$/, '') + path;
    navigate(url);
  };

  const navigateWithPage = (path: string, additionalParams = {}) => {
    const params = new URLSearchParams({ page: '0', ...additionalParams });
    navigate({ pathname: path, search: params.toString() });
  };

  return { appendPath, appendPathWithPage, replaceLastPath, navigateWithPage };
}

export default useCustomNavigate;
