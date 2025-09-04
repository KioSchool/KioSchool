import * as StompJs from '@stomp/stompjs';
import kioSchoolOrderAlarm from '@resources/audio/kioSchoolOrderAlarm.mp3';
import { Order, OrderWebsocket } from '@@types/index';
import { useSetAtom } from 'jotai';
import { adminOrdersAtom } from '../../jotai/admin/atoms';
import { useEffect, useCallback, useRef, useMemo } from 'react';

const ENVIRONMENT = import.meta.env.VITE_ENVIRONMENT;
const url = ENVIRONMENT === 'development' ? 'ws://localhost:8080/ws' : 'wss://api.kio-school.com/ws';

function playOrderCreateAudio() {
  const audio = new Audio(kioSchoolOrderAlarm);
  audio.play().catch((error) => console.error('Audio play failed:', error));
}

interface UseOrdersWebsocketProps {
  workspaceId: string | undefined;
  refetchOrders: () => void;
}

function useOrdersWebsocket({ workspaceId, refetchOrders }: UseOrdersWebsocketProps) {
  const setOrders = useSetAtom(adminOrdersAtom);
  const timerIdRef = useRef<NodeJS.Timeout | null>(null);

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

  const startPolling = useCallback(() => {
    if (timerIdRef.current) {
      return;
    }

    if (refetchOrders) {
      const RESYNC_INTERVAL_MS = 1000;
      timerIdRef.current = setInterval(() => {
        refetchOrders();
      }, RESYNC_INTERVAL_MS);
    }
  }, []);

  const stopPolling = useCallback(() => {
    if (timerIdRef.current) {
      clearInterval(timerIdRef.current);
      timerIdRef.current = null;
    }
  }, []);

  const client = useMemo(
    () =>
      new StompJs.Client({
        brokerURL: url,
        debug: (str) => {
          console.log(str);
        },
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
      }),
    [],
  );

  useEffect(() => {
    let subscription: StompJs.StompSubscription | null = null;

    client.onConnect = () => {
      stopPolling();

      if (!subscription) {
        subscription = client.subscribe(`/sub/order/${workspaceId}`, (response) => {
          const orderWebsocket: OrderWebsocket = JSON.parse(response.body);
          const order = orderWebsocket.data;

          if (orderWebsocket.type === 'CREATED') {
            playOrderCreateAudio();
            addOrder(order);
          } else if (orderWebsocket.type === 'UPDATED') {
            updateOrder(order);
          }
        });
      }
    };

    client.onWebSocketError = (error) => {
      console.error('WebSocket error', error);
      startPolling();
    };

    client.onStompError = (frame) => {
      console.error('Broker reported error: ' + frame.headers.message);
      client.deactivate();
    };

    client.activate();

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
      client.deactivate();
      stopPolling();
    };
  }, [client, workspaceId, addOrder, updateOrder, startPolling, stopPolling]);
}

export default useOrdersWebsocket;
