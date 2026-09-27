import { useEffect, useState } from 'react';
import useApi from '@hooks/useApi';

const ORDER_AVAILABILITY_POLL_INTERVAL_MS = 5000;

interface UseOrderAvailabilityParams {
  workspaceId: string | null;
  tableNo: string | null;
  isEnabled: boolean;
}

function useOrderAvailability({ workspaceId, tableNo, isEnabled }: UseOrderAvailabilityParams) {
  const { userApi } = useApi();
  const [isOrderBlocked, setIsOrderBlocked] = useState(false);

  useEffect(() => {
    if (!isEnabled || !workspaceId || !tableNo) return;

    let intervalId: NodeJS.Timeout | undefined;
    let terminated = false;

    const stopPolling = () => {
      if (!intervalId) return;

      clearInterval(intervalId);
      intervalId = undefined;
    };

    const terminate = () => {
      terminated = true;
      stopPolling();
    };

    const checkAvailability = async () => {
      try {
        const response = await userApi.get<boolean>('/order/available', { params: { workspaceId, tableNumber: tableNo }, skipGlobalLoading: true });
        if (terminated) return;

        const isAvailable = response.data;
        setIsOrderBlocked(!isAvailable);
        if (isAvailable) terminate();
      } catch {
        if (terminated) return;

        // 확인에 실패하면 막지 않는다. 주문 가능 여부의 최종 판단은 POST /order가 하므로, 이 API의 장애가 주문 장애로 번지면 안 된다.
        setIsOrderBlocked(false);
        terminate();
      }
    };

    const startPolling = () => {
      if (intervalId || terminated) return;
      intervalId = setInterval(checkAvailability, ORDER_AVAILABILITY_POLL_INTERVAL_MS);
    };

    // 백그라운드 탭에서는 모바일 OS가 fetch를 throttle/abort 하므로 폴링 자체를 멈춘다.
    const handleVisibilityChange = () => {
      if (terminated) return;

      if (document.hidden) {
        stopPolling();
        return;
      }

      checkAvailability();
      startPolling();
    };

    checkAvailability();
    startPolling();
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      terminate();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isEnabled, workspaceId, tableNo]);

  return { isOrderBlocked };
}

export default useOrderAvailability;
