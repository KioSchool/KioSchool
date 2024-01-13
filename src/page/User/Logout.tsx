import { useEffect } from 'react';
import useApi from '../../hook/useApi';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const { userApi } = useApi();
  const navigate = useNavigate();

  useEffect(() => {
    userApi
      .post<any>('/logout')
      .then(() => {
        navigate('/');
      })
      .catch(() => {
        alert('Logout Failed!');
        navigate('/');
      });
  }, []);
  return <h2>THIS IS LOGOUT PAGE</h2>;
}
export default Logout;
