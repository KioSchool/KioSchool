import { useEffect, useRef } from 'react';

// 숨은 탭은 건너뛰고, 다시 보이면 다음 주기를 기다리지 않고 바로 한 번 부른다
function useVisiblePolling(callback: () => void, intervalMs: number, enabled = true) {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    if (!enabled) return undefined;

    const timer = setInterval(() => {
      if (document.hidden) return;
      callbackRef.current();
    }, intervalMs);

    const handleVisibilityChange = () => {
      if (!document.hidden) callbackRef.current();
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(timer);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [intervalMs, enabled]);
}

export default useVisiblePolling;
