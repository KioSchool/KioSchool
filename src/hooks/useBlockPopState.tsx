import { useEffect } from 'react';

function useBlockPopState() {
  useEffect(() => {
    window.history.pushState(null, '', window.location.href);
    const handlePopState = () => {
      console.warn('Popstate event blocked to prevent navigation.');
      window.history.pushState(null, '', window.location.href);
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);
}

export default useBlockPopState;
