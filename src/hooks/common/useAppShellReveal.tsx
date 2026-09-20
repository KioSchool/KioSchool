import { useLayoutEffect } from 'react';
import { APP_SHELL_ATTRIBUTE, APP_SHELL_SPLASH_ID } from '@constants/appShell';

// useEffect 가 아니라 useLayoutEffect 여야 스플래시와 실제 화면 사이가 한 프레임도 끊기지 않는다.
function useAppShellReveal() {
  useLayoutEffect(() => {
    document.documentElement.removeAttribute(APP_SHELL_ATTRIBUTE);
    document.getElementById(APP_SHELL_SPLASH_ID)?.remove();
  }, []);
}

export default useAppShellReveal;
