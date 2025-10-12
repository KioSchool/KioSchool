import * as StompJs from '@stomp/stompjs';
import kioSchoolOrderAlarm from '@resources/audio/kioSchoolOrderAlarm.mp3';
import { Order, OrderWebsocket } from '@@types/index';
import { useSetAtom } from 'jotai';
import { adminOrdersAtom } from '../../jotai/admin/atoms';
import { useCallback, useEffect, useMemo } from 'react';
import SockJS from 'sockjs-client/dist/sockjs';

const ENVIRONMENT = import.meta.env.VITE_ENVIRONMENT;
const sockJSUrl = ENVIRONMENT === 'development' ? 'http://localhost:8080/api/ws' : 'https://api.kio-school.com/ws';

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

  const client = useMemo(
    () =>
      new StompJs.Client({
        webSocketFactory: () => new SockJS(sockJSUrl),
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
    };

    client.onStompError = (frame) => {
      console.error('Broker reported error: ' + frame.headers.message);
    };

    client.activate();

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
      client.deactivate();
    };
  }, [client, workspaceId, addOrder, updateOrder]);
}

export default useOrdersWebsocket;
