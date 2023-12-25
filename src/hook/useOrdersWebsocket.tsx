import { useSetRecoilState } from 'recoil';
import { ordersAtom } from '../recoil/atoms';
import * as StompJs from '@stomp/stompjs/esm6';
import { adminApi, userApi } from '../axios';
import { Order } from '../type';

function UseOrdersWebsocket(workspaceId: string) {
  const setOrders = useSetRecoilState(ordersAtom);

  const fetchOrders = () => {
    adminApi.get<Order[]>(`/orders?workspaceId=${workspaceId}`).then((res) => {
      setOrders(res.data);
    });
  };

  const subscribeOrders = () => {
    const client = new StompJs.Client({
      brokerURL: `ws://${userApi.defaults.baseURL}/ws`,
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

export default UseOrdersWebsocket;
