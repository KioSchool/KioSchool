import { useState, useEffect, useCallback } from 'react';

const verifyConnectivity = async (timeout = 5000): Promise<boolean> => {
  const fetchUrl = `https://www.google.com/favicon.ico?t=${Date.now()}`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    await fetch(fetchUrl, {
      method: 'HEAD',
      mode: 'no-cors',
      cache: 'no-store',
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    return true;
  } catch (error) {
    console.warn(`Network connectivity check to ${fetchUrl} failed:`, error);
    return false;
  }
};

function useNetwork(): boolean {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

  const performCheck = useCallback(async () => {
    const currentStatus = await verifyConnectivity();
    setIsOnline(currentStatus);
  }, []);

  useEffect(() => {
    const handleOnline = () => {
      performCheck();
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
}

export default useNetwork;
