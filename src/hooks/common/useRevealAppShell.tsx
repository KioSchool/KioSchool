import { useEffect } from 'react';
import { APP_SHELL_CLASS } from '@constants/appShell';

// 첫 커밋 뒤에 떼야 스플래시에서 실제 페이지로 빈 프레임 없이 이어진다.
function useRevealAppShell() {
  useEffect(() => {
    document.documentElement.classList.remove(APP_SHELL_CLASS);
  }, []);
}

export default useRevealAppShell;
