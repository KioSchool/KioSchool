import * as StompJs from '@stomp/stompjs';
import kioSchoolOrderAlarm from '@resources/audio/kioSchoolOrderAlarm.mp3';
import { Order, OrderWebsocket } from '@@types/index';
import { useSetAtom } from 'jotai';
import { adminOrdersAtom } from '../../jotai/admin/atoms';

const ENVIRONMENT = import.meta.env.VITE_ENVIRONMENT;

function playOrderCreateAudio() {
  const audio = new Audio(kioSchoolOrderAlarm);
  audio.play();
}

function useOrdersWebsocket(workspaceId: string | undefined) {
  const setOrders = useSetAtom(adminOrdersAtom);

  const addOrder = (order: Order) => {
    setOrders((prevOrders) => {
      return [...prevOrders, order];
    });
  };

  const updateOrder = (order: Order) => {
    setOrders((prevOrders) => {
      return prevOrders.map((prevOrder) => (prevOrder.id === order.id ? order : prevOrder));
    });
  };

  const url = ENVIRONMENT === 'development' ? 'ws://localhost:8080/ws' : 'wss://api.kio-school.com/ws';
  const client = new StompJs.Client({
    brokerURL: url,
    debug: (str) => {
      console.log(str);
    },
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
  });

  const subscribeOrders = () => {
    client.onConnect = function () {
      client.subscribe(`/sub/order/${workspaceId}`, (response) => {
        const orderWebsocket: OrderWebsocket = JSON.parse(response.body);
        const order = orderWebsocket.data;
        if (orderWebsocket.type == 'CREATED') {
          playOrderCreateAudio();
          addOrder(order);
        } else if (orderWebsocket.type == 'UPDATED') {
          updateOrder(order);
        }
      });
    };

    client.activate();
  };

  const unsubscribeOrders = () => {
    client.unsubscribe(`/sub/order/${workspaceId}`);
    client.deactivate();
  };

  return { subscribeOrders, unsubscribeOrders };
}

export default useOrdersWebsocket;
