import { useEffect, useState } from 'react';

// iOS 주소창이 접히고 펼쳐질 때(약 80px)마다 높이가 바뀌어 화면이 출렁이지 않게, 이보다 작은 변화는 무시한다
const MIN_HEIGHT_CHANGE_PX = 120;

function useWindowHeight() {
  const [height, setHeight] = useState(() => window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setHeight((prev) => {
        if (Math.abs(window.innerHeight - prev) < MIN_HEIGHT_CHANGE_PX) return prev;
        return window.innerHeight;
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return height;
}

export default useWindowHeight;
