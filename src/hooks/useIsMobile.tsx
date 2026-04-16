import { useEffect, useState } from 'react';
import { MOBILE_BREAKPOINT } from '@styles/globalStyles';

const query = `(max-width: ${MOBILE_BREAKPOINT}px)`;

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => window.matchMedia(query).matches);

  useEffect(() => {
    const mobileQuery = window.matchMedia(query);
    const handleChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);

    mobileQuery.addEventListener('change', handleChange);
    return () => mobileQuery.removeEventListener('change', handleChange);
  }, []);

  return isMobile;
}

export default useIsMobile;
