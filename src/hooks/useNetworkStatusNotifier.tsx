import { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import useNetwork from '@hooks/useNetwork';

function useNetworkStatusNotifier() {
  const isOnline = useNetwork();
  const previousOnlineStatusRef = useRef<boolean>(isOnline);

  useEffect(() => {
    const previousStatus = previousOnlineStatusRef.current;

    if (previousStatus && !isOnline) {
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
}

export default useNetworkStatusNotifier;
