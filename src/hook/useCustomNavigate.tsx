import { useLocation, useNavigate } from 'react-router-dom';

function useCustomNavigate() {
  const location = useLocation();
  const navigate = useNavigate();

  const appendPath = (path: string) => {
    navigate(location.pathname + path);
  };

  return { appendPath };
}

export default useCustomNavigate;
