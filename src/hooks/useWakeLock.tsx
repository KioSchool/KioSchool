import { useCallback, useEffect, useRef, useState } from 'react';

type WakeLockType = 'screen';

export interface WakeLockSentinel extends EventTarget {
  released: boolean;
  type: WakeLockType;
  release: () => Promise<void>;
  onrelease: ((this: WakeLockSentinel, ev: Event) => any) | null;
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

    if (wakeLockRef.current !== null) {
      return;
    }

    try {
      const lock = await navigator.wakeLock.request('screen');
      lock.onrelease = () => {
        setIsLocked(false);
      };

      wakeLockRef.current = lock;
      setIsLocked(true);
    } catch (err) {
      setIsLocked(false);
    }
  }, []);

  const releaseLock = useCallback(async () => {
    const lock = wakeLockRef.current;
    if (lock) {
      try {
        lock.onrelease = null;
        await lock.release();
      } catch (err) {
        console.error('Wake Lock release failed:', err);
      } finally {
        wakeLockRef.current = null;
        setIsLocked(false);
      }
    }
  }, []);

  useEffect(() => {
    requestLock();

    document.onvisibilitychange = () => {
      if (document.visibilityState === 'visible') {
        requestLock();
      }
    };

    return () => {
      releaseLock();
      document.onvisibilitychange = null;
    };
  }, [requestLock, releaseLock]);

  return { isLocked, requestLock, releaseLock };
};
