import { useState, useEffect, useCallback, useRef } from 'react';

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

function useNetwork(checkInterval = 5000): boolean {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const isChecking = useRef(false);
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);

  const performCheck = useCallback(async () => {
    if (isChecking.current) return;
    isChecking.current = true;

    const currentStatus = await verifyConnectivity();

    setIsOnline(currentStatus);

    isChecking.current = false;
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

    intervalIdRef.current = setInterval(() => {
      if (navigator.onLine) {
        performCheck();
      }
    }, checkInterval);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
    };
  }, []);

  return isOnline;
}

export default useNetwork;
