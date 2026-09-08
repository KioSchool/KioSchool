import * as StompJs from '@stomp/stompjs';
import * as Sentry from '@sentry/react';
import kioSchoolOrderAlarm from '@resources/audio/kioSchoolOrderAlarm.mp3';
import { Order, OrderWebsocket } from '@@types/index';
import { useSetAtom } from 'jotai';
import { adminOrdersAtom } from '@jotai/admin/atoms';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import SockJS from 'sockjs-client/dist/sockjs';
import { URLS } from '@constants/urls';

// 마지막 실패로부터 이 시간이 지나 다시 실패하면 별개의 장애(새 버스트)로 보고 즉시 보고한다.
const WS_FAILURE_BURST_RESET_MS = 60_000;
// 같은 장애가 반복돼도(reconnectDelay 5초 자동 재시도) 이 간격 안에는 재보고하지 않는다.
// 9/4 실측: 구독 거부가 1시간에 541건까지 반복될 수 있어 폭주 억제가 필요하다.
const WS_FAILURE_REPORT_COOLDOWN_MS = 600_000;

function playOrderCreateAudio() {
  const audio = new Audio(kioSchoolOrderAlarm);
  audio.play().catch((error) => console.error('Audio play failed:', error));
}

function useOrdersWebsocket(workspaceId: string | undefined) {
  const setOrders = useSetAtom(adminOrdersAtom);

  // 첫 실패는 즉시 보고한다 — 구독 거부는 단 1회만 나도(실측) 그 화면은 재접속 전까지
  // 영구히 주문을 못 받으므로 threshold를 두면 놓친다. 폭주는 쿨다운으로만 막는다.
  const lastFailureAt = useRef(0);
  const lastReportAt = useRef(0);
  const failureCount = useRef(0);

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
    let subscription: StompJs.StompSubscription | null = null;
    const destination = `/sub/order/${workspaceId}`;

    // 연결/구독이 거부되거나(STOMP ERROR 프레임) 전송 계층이 실패하면 기존에는
    // console.error만 남아 Sentry Issue가 되지 못했다. 실시간 주문 화면이 조용히
    // 죽는 상황을 잡기 위해 사용자·workspaceId·사유를 실어 직접 보고한다.
    // phase: 'stomp' = 서버가 거부(권한/토큰 등), 'transport' = 소켓 자체 실패.
    const reportWsFailure = (phase: 'stomp' | 'transport', reason: string) => {
      const now = Date.now();
      const isNewBurst = now - lastFailureAt.current >= WS_FAILURE_BURST_RESET_MS;
      if (isNewBurst) {
        failureCount.current = 1;
      } else {
        failureCount.current += 1;
      }
      lastFailureAt.current = now;

      // 새 장애면 즉시, 아니면 쿨다운이 지난 뒤에만 보고한다.
      if (!isNewBurst && now - lastReportAt.current < WS_FAILURE_REPORT_COOLDOWN_MS) return;
      lastReportAt.current = now;

      Sentry.captureException(new Error(`WebSocket ${phase} failure: ${reason}`), {
        tags: {
          errorType: 'websocket',
          wsPhase: phase,
          subscribedWorkspaceId: workspaceId ?? 'none',
        },
        extra: {
          destination,
          reason,
          failureCountInBurst: failureCount.current,
          wsUrl: URLS.WS,
        },
      });
    };

    client.onConnect = () => {
      if (!subscription) {
        subscription = client.subscribe(destination, (response) => {
          // 메시지 수신 = 파이프가 실제로 살아있다는 확실한 신호. 다음 실패를 새 버스트로 취급한다.
          lastFailureAt.current = 0;
          failureCount.current = 0;

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
      reportWsFailure('transport', 'WebSocket transport error');
    };

    client.onStompError = (frame) => {
      const reason = frame.headers.message || 'unknown STOMP error';
      console.error('Broker reported error: ' + reason);
      reportWsFailure('stomp', reason);
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
