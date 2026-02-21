import * as StompJs from '@stomp/stompjs';
import kioSchoolOrderAlarm from '@resources/audio/kioSchoolOrderAlarm.mp3';
import { Order, OrderWebsocket } from '@@types/index';
import { useSetAtom } from 'jotai';
import { adminOrdersAtom } from '@jotai/admin/atoms';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import SockJS from 'sockjs-client/dist/sockjs';
import { URLS } from '@constants/urls';
import useIdleTimeout from '@hooks/common/useIdleTimeout';

function playOrderCreateAudio() {
  const audio = new Audio(kioSchoolOrderAlarm);
  audio.play().catch((error) => console.error('Audio play failed:', error));
}

const IDLE_TIMEOUT_MS = 20 * 60 * 1000;

function useOrdersWebsocket(workspaceId: string | undefined) {
  const setOrders = useSetAtom(adminOrdersAtom);
  const clientRef = useRef<StompJs.Client | null>(null);

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

  const handleIdleTimeout = useCallback(() => {
    if (clientRef.current && clientRef.current.active) {
      clientRef.current.deactivate();
    }

    alert('장시간 활동이 없어 서버 연결이 일시 중단되었습니다.\n 그 동안 들어온 주문 정보는 새로고침 후 확인 가능합니다.');

    window.location.reload();
  }, []);

  const { resetTimer } = useIdleTimeout({
    timeoutMs: IDLE_TIMEOUT_MS,
    onTimeout: handleIdleTimeout,
  });

  const client = useMemo(
    () =>
      new StompJs.Client({
        webSocketFactory: () => new SockJS(URLS.WS),
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
    clientRef.current = client;

    let subscription: StompJs.StompSubscription | null = null;

    client.onConnect = () => {
      if (!subscription) {
        subscription = client.subscribe(`/sub/order/${workspaceId}`, (response) => {
          resetTimer();

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
  }, [client, workspaceId, addOrder, updateOrder, resetTimer]);
}

export default useOrdersWebsocket;
