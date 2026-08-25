import * as StompJs from '@stomp/stompjs';
import SockJS from 'sockjs-client/dist/sockjs';
import { useEffect, useMemo, useRef } from 'react';
import { Order, OrderWebsocket } from '@@types/index';
import { URLS } from '@constants/urls';

interface TableOrdersWebsocketHandlers {
  onOrderCreated: (order: Order) => void;
  onOrderUpdated: (order: Order) => void;
  /** 연결·재연결 시 호출. 끊긴 동안 놓친 주문을 재동기화하는 용도. */
  onConnected?: () => void;
}

/**
 * 실시간 테이블 화면용 주문 구독. useOrdersWebsocket(user)과 전송부가 같지만
 * 그쪽은 adminOrdersAtom·알림음에 결합되어 있어 콜백형으로 분리했다. 전송부 공통화는 승격 후보.
 */
function useTableOrdersWebsocket(workspaceId: string | undefined, handlers: TableOrdersWebsocketHandlers) {
  // 콜백이 바뀔 때마다 재연결하지 않도록 ref로 최신 핸들러만 갈아끼운다.
  const handlersRef = useRef(handlers);
  handlersRef.current = handlers;

  const client = useMemo(
    () =>
      new StompJs.Client({
        webSocketFactory: () => new SockJS(URLS.WS),
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
      }),
    [],
  );

  useEffect(() => {
    let subscription: StompJs.StompSubscription | null = null;

    client.onConnect = () => {
      handlersRef.current.onConnected?.();
      subscription = client.subscribe(`/sub/order/${workspaceId}`, (response) => {
        const { type, data }: OrderWebsocket = JSON.parse(response.body);

        if (type === 'CREATED') handlersRef.current.onOrderCreated(data);
        if (type === 'UPDATED') handlersRef.current.onOrderUpdated(data);
      });
    };

    client.onWebSocketError = (error) => {
      console.error('WebSocket error', error);
    };

    client.onStompError = (frame) => {
      console.error('Broker reported error: ' + frame.headers.message);
    };

    client.activate();

    return () => {
      subscription?.unsubscribe();
      client.deactivate();
    };
  }, [client, workspaceId]);
}

export default useTableOrdersWebsocket;
