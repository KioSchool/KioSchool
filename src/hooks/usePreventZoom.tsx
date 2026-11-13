import { useEffect } from 'react';

const NO_ZOOM_VIEWPORT_CONTENT = 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no';
const NO_ZOOM_TOUCH_ACTION = 'pan-x pan-y';

function usePreventZoom() {
  useEffect(() => {
    const viewportMeta = document.querySelector<HTMLMetaElement>('meta[name="viewport"]');
    const originalViewportContent = viewportMeta?.content;
    const rootStyle = document.documentElement.style;
    const originalTouchAction = rootStyle.touchAction;

    // iOS Safari는 viewport의 user-scalable=no를 무시하므로 핀치 제스처를 직접 막는다
    const handleGestureStart = (event: Event) => {
      event.preventDefault();
    };

    // Chrome은 로드 후 바뀐 viewport meta를 반영하지 않는다 — 핀치·더블탭은 touch-action이 막고, meta는 iOS 입력창 포커스 확대만 막는다
    if (viewportMeta) viewportMeta.content = NO_ZOOM_VIEWPORT_CONTENT;
    rootStyle.touchAction = NO_ZOOM_TOUCH_ACTION;
    document.addEventListener('gesturestart', handleGestureStart);

    return () => {
      if (viewportMeta && originalViewportContent !== undefined) viewportMeta.content = originalViewportContent;
      rootStyle.touchAction = originalTouchAction;
      document.removeEventListener('gesturestart', handleGestureStart);
    };
  }, []);
}

export default usePreventZoom;
