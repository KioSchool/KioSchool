import React, { useEffect } from 'react';
import * as StompJs from '@stomp/stompjs';

function WebsocketComponent() {
  useEffect(() => {
    const client = new StompJs.Client({
      brokerURL: 'ws://localhost:8080/ws',
      connectHeaders: {
        Authorization:
          'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0Iiwicm9sZXMiOlsiU1VQRVJfQURNSU4iXSwiZXhwIjoxNzAyNTU5NTUzfQ.LEomLzKbeqjXbtBmcbSjDF1ABOrXw-ZVy10z865cjuc',
      },
      debug: (str) => {
        console.log(str);
      },
      reconnectDelay: 5000, // 자동 재 연결
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    client.onConnect = function () {
      client.subscribe('/sub/order/38', (message) => {
        console.log(message.body);
      });
    };

    client.activate();
  }, []);

  return <></>;
}

export default WebsocketComponent;
