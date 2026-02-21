import { useCallback, useEffect, useRef } from 'react';
import { throttle } from 'lodash';

interface UseIdleTimeoutProps {
  timeoutMs: number;
  onTimeout: () => void;
}

const useIdleTimeout = ({ timeoutMs, onTimeout }: UseIdleTimeoutProps) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleTimeout = useCallback(() => {
    onTimeout();
  }, [onTimeout]);

  const resetTimer = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(handleTimeout, timeoutMs);
  }, [timeoutMs, handleTimeout]);

  useEffect(() => {
    const handleActivity = throttle(() => {
      resetTimer();
    }, 1000);

    const events = ['mousemove', 'keydown', 'scroll', 'click', 'touchstart'];

    events.forEach((event) => {
      window.addEventListener(event, handleActivity);
    });

    resetTimer();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      events.forEach((event) => {
        window.removeEventListener(event, handleActivity);
      });
      handleActivity.cancel();
    };
  }, [resetTimer]);

  return { resetTimer };
};

export default useIdleTimeout;
