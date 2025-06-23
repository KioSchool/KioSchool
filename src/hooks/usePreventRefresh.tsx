import { useEffect } from 'react';

function usePreventRefresh() {
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      console.warn('blocked refresh');
      event.preventDefault();
      event.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);
}

export default usePreventRefresh;
