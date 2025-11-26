import { useCallback, useEffect, useRef, useState } from 'react';

type WakeLockType = 'screen';

export interface WakeLockSentinel extends EventTarget {
  released: boolean;
  type: WakeLockType;
  release: () => Promise<void>;
}

export interface WakeLock {
  request: (type: WakeLockType) => Promise<WakeLockSentinel>;
}

declare global {
  interface Navigator {
    wakeLock: WakeLock;
  }
}

export const useWakeLock = () => {
  const [isLocked, setIsLocked] = useState(false);
  const wakeLockRef = useRef<WakeLockSentinel | null>(null);

  const requestLock = useCallback(async () => {
    if (!('wakeLock' in navigator)) {
      console.warn('이 브라우저는 화면 켜짐 유지(Wake Lock)를 지원하지 않습니다.');
      return;
    }

    try {
      const lock = await navigator.wakeLock.request('screen');
      lock.addEventListener('release', () => {
        setIsLocked(false);
      });

      wakeLockRef.current = lock;
      setIsLocked(true);
    } catch (err) {
      setIsLocked(false);
    }
  }, []);

  const releaseLock = useCallback(async () => {
    if (wakeLockRef.current) {
      await wakeLockRef.current.release();
      wakeLockRef.current = null;
      setIsLocked(false);
    }
  }, []);

  useEffect(() => {
    requestLock();

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        requestLock();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      releaseLock();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [requestLock, releaseLock]);

  return { isLocked, requestLock, releaseLock };
};
