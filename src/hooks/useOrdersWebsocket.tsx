import { useSetRecoilState } from 'recoil';
import { ordersAtom } from '@recoils/atoms';
import * as StompJs from '@stomp/stompjs';
import { Order } from '@@types/index';
import useApi from '@hooks/useApi';

function useOrdersWebsocket(workspaceId: string | undefined) {
  const { adminApi } = useApi();
  const setOrders = useSetRecoilState(ordersAtom);

  const fetchOrders = () => {
    adminApi
      .get<Order[]>('/orders', {
        params: {
          workspaceId: workspaceId,
        },
      })
      .then((res) => {
        setOrders(res.data);
      });
  };

  const subscribeOrders = () => {
    const url = process.env.REACT_APP_ENVIRONMENT === 'development' ? 'ws://localhost:8080/ws' : 'wss://kio-school.fly.dev/ws';
    const client = new StompJs.Client({
      brokerURL: url,
      debug: (str) => {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    client.onConnect = function () {
      client.subscribe(`/sub/order/${workspaceId}`, () => {
        fetchOrders();
      });
    };

    client.activate();
  };

  return { fetchOrders, subscribeOrders };
}

export default useOrdersWebsocket;
