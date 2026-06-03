import kioSchoolOrderAlarm from '@resources/audio/kioSchoolOrderAlarm.mp3';
import { Order, OrderWebsocket } from '@@types/index';
import { useSetAtom } from 'jotai';
import { adminOrdersAtom } from '@jotai/admin/atoms';
import { useCallback, useEffect } from 'react';
import { URLS } from '@constants/urls';

function playOrderCreateAudio() {
  const audio = new Audio(kioSchoolOrderAlarm);
  audio.play().catch((error) => console.error('Audio play failed:', error));
}

function useOrdersWebsocket(workspaceId: string | undefined) {
  const setOrders = useSetAtom(adminOrdersAtom);

  const addOrder = useCallback(
    (order: Order) => {
      setOrders((prevOrders) => [...prevOrders, order]);
    },
    [setOrders],
  );

  const updateOrder = useCallback(
    (order: Order) => {
      setOrders((prevOrders) => prevOrders.map((prevOrder) => (prevOrder.id === order.id ? order : prevOrder)));
    },
    [setOrders],
  );

  useEffect(() => {
    if (!workspaceId) return;

    const eventSource = new EventSource(`${URLS.SSE}/orders/${workspaceId}`, { withCredentials: true });

    eventSource.onmessage = (event) => {
      const orderWebsocket: OrderWebsocket = JSON.parse(event.data);
      const order = orderWebsocket.data;

      if (orderWebsocket.type === 'CREATED') {
        playOrderCreateAudio();
        addOrder(order);
      } else if (orderWebsocket.type === 'UPDATED') {
        updateOrder(order);
      }
    };

    eventSource.onerror = (error) => {
      console.error('SSE error', error);
    };

    return () => {
      eventSource.close();
    };
  }, [workspaceId, addOrder, updateOrder]);
}

export default useOrdersWebsocket;
