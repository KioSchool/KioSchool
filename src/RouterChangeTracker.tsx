import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';

function RouterChangeTracker() {
  const location = useLocation();

  // location 변경 감지시 pageview 이벤트 전송
  useEffect(() => {
    ReactGA.set({ page: location.pathname });
    ReactGA.send('pageview');
  }, [location]);
}

export default RouterChangeTracker;
