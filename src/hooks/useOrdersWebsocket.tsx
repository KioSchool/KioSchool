import * as StompJs from '@stomp/stompjs';
import useAdminOrder from '@hooks/useAdminOrder';

function useOrdersWebsocket(workspaceId: string | undefined) {
  const { fetchAllOrders } = useAdminOrder(workspaceId);

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
        fetchAllOrders();
      });
    };

    client.activate();
  };

  return { subscribeOrders };
}

export default useOrdersWebsocket;
