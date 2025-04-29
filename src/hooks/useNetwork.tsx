import { useState, useEffect, useCallback, useRef } from 'react';

const verifyConnectivity = async (timeout = 5000): Promise<boolean> => {
  const testUrl = `https://www.google.com/favicon.ico?t=${Date.now()}`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    await fetch(testUrl, {
      method: 'HEAD',
      mode: 'no-cors',
      cache: 'no-store',
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    return true;
  } catch (error) {
    console.warn(`Network connectivity check to ${testUrl} failed:`, error);
    return false;
  }
};

function useNetwork(checkInterval = 5000): boolean {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const isChecking = useRef(false);
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);

  const performCheck = useCallback(async (triggeredByEvent = false) => {
    if (isChecking.current) return;
    isChecking.current = true;

    let currentStatus: boolean;
    if (!navigator.onLine) {
      currentStatus = false;
    } else {
      if (triggeredByEvent) {
        console.log('브라우저가 온라인 상태로 변경되었습니다.');
      }
      currentStatus = await verifyConnectivity();
    }

    setIsOnline((prevIsOnline) => {
      if (prevIsOnline !== currentStatus) {
        console.log(`Verified connection status: ${currentStatus}`);
        return currentStatus;
      }
      return prevIsOnline;
    });

    isChecking.current = false;
  }, []);

  useEffect(() => {
    const handleOnline = () => {
      performCheck(true);
    };

    const handleOffline = () => {
      console.log('Browser reported offline.');
      setIsOnline((prevIsOnline) => (prevIsOnline ? false : prevIsOnline));
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    performCheck();

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
  }, [performCheck]);

  return isOnline;
}

export default useNetwork;
