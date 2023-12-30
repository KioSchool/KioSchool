import useApi from './useApi';

function useUser() {
  const { adminApi } = useApi();

  const isLoggedIn = () => {
    adminApi.get('/user');
    return true;
  };

  return { isLoggedIn };
}

export default useUser;
