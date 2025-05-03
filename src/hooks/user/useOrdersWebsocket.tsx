import * as StompJs from '@stomp/stompjs';
import useAdminOrder from '@hooks/admin/useAdminOrder';
import kioSchoolOrderAlarm from '@resources/audio/kioSchoolOrderAlarm.mp3';

function playOrderCreateAudio() {
  const audio = new Audio(kioSchoolOrderAlarm);
  audio.play();
}

function useOrdersWebsocket(workspaceId: string | undefined) {
  const { fetchTodayOrders } = useAdminOrder(workspaceId);
  const url = process.env.REACT_APP_ENVIRONMENT === 'development' ? 'ws://localhost:8080/ws' : 'wss://api.kio-school.com/ws';
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
        const data = JSON.parse(response.body);
        if (data.type == 'CREATED') {
          playOrderCreateAudio();
        }

        fetchTodayOrders();
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
