import { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import useNetwork from '@hooks/useNetwork';
import { NETWORK_BLOCKED_EVENT } from '@constants/network';

// 요청 단위 사건이라 오프라인 토스트처럼 상태가 풀릴 때까지 붙잡아 두지 않고, 안내를 읽고 행동할 시간만 준다.
const BLOCKED_TOAST_AUTO_CLOSE_MS = 10000;

function useNetworkStatusNotifier() {
  const isOnline = useNetwork();
  const previousOnlineStatusRef = useRef<boolean>(isOnline);

  useEffect(() => {
    const previousStatus = previousOnlineStatusRef.current;

    if (previousStatus && !isOnline) {
      toast.dismiss('network-online');
      toast.error('네트워크 연결이 끊어졌습니다.', {
        toastId: 'network-offline',
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        position: 'top-right',
        theme: 'light',
      });
    } else if (!previousStatus && isOnline) {
      toast.dismiss('network-offline');
      toast.success('네트워크 연결이 복구되었습니다.', {
        toastId: 'network-online',
        autoClose: 5000,
        position: 'top-right',
        theme: 'light',
      });
    }

    previousOnlineStatusRef.current = isOnline;
  }, [isOnline]);

  // 온라인이고 API 호스트도 닿는데 요청만 죽은 경우. 회선은 멀쩡하므로 위의 오프라인 판정은 이 경우를 못 잡는다.
  // 사전 요청이 필요한 JSON POST만 막는 기업망 프록시가 전형이라, 다른 네트워크로 안내한다.
  useEffect(() => {
    const handleBlocked = () => {
      toast.error('네트워크 정책으로 요청이 차단됐습니다. 회사나 학교 네트워크라면 다른 네트워크에서 다시 시도해 주세요.', {
        toastId: 'network-blocked',
        autoClose: BLOCKED_TOAST_AUTO_CLOSE_MS,
        position: 'top-right',
        theme: 'light',
      });
    };

    window.addEventListener(NETWORK_BLOCKED_EVENT, handleBlocked);

    return () => {
      window.removeEventListener(NETWORK_BLOCKED_EVENT, handleBlocked);
    };
  }, []);
}

export default useNetworkStatusNotifier;
