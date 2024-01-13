import useApi from './useApi';
import { useNavigate } from 'react-router-dom';

function useLogout() {
  const { userApi } = useApi();
  const navigate = useNavigate();

  const logoutHandler = () => {
    userApi
      .post<any>('/logout')
      .catch(() => {
        alert('Logout Failed!');
      })
      .finally(() => navigate('/'));
  };

  return { logoutHandler };
}
export default useLogout;
