import { useEffect, useState } from 'react';

function useMarketingLoginStatus() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
  }, []);

  return isLoggedIn;
}

export default useMarketingLoginStatus;
