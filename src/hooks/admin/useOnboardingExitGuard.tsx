import { useEffect } from 'react';
import { useBeforeUnload, useBlocker } from 'react-router-dom';

function useOnboardingExitGuard(shouldBlock: boolean, message: string) {
  const blocker = useBlocker(shouldBlock);

  useBeforeUnload(
    (event) => {
      if (!shouldBlock) {
        return;
      }

      event.preventDefault();
      event.returnValue = message;
    },
    { capture: true },
  );

  useEffect(() => {
    if (blocker.state !== 'blocked') {
      return;
    }

    const shouldLeave = window.confirm(message);

    if (shouldLeave) {
      blocker.proceed();
      return;
    }

    blocker.reset();
  }, [blocker, message]);
}

export default useOnboardingExitGuard;
