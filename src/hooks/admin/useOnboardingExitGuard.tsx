import { useContext, useEffect } from 'react';
import { UNSAFE_NavigationContext, useBeforeUnload } from 'react-router-dom';

interface HistoryNavigator {
  block: (blocker: (transition: { retry: () => void }) => void) => () => void;
}

function useOnboardingExitGuard(shouldBlock: boolean, message: string) {
  const { navigator } = useContext(UNSAFE_NavigationContext);

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
    if (!shouldBlock) {
      return;
    }

    const historyNavigator = navigator as unknown as HistoryNavigator;

    if (!historyNavigator.block) {
      return;
    }

    const unblock = historyNavigator.block((transition) => {
      const shouldLeave = window.confirm(message);

      if (shouldLeave) {
        unblock();
        transition.retry();
      }
    });

    return unblock;
  }, [message, navigator, shouldBlock]);
}

export default useOnboardingExitGuard;
