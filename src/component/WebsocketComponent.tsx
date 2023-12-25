import React, { useEffect } from 'react';
import * as StompJs from '@stomp/stompjs';

interface Props {
  workspaceId: number;
}

// todo 삭제 예정
function WebsocketComponent({ workspaceId }: Props) {
  useEffect(() => {
    const client = new StompJs.Client({
      brokerURL: 'ws://localhost:8080/ws',
      debug: (str) => {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    client.onConnect = function () {
      client.subscribe(`/sub/order/${workspaceId}`, (message) => {
        console.log(message.body);
      });
    };

    client.activate();
  }, []);

  return <></>;
}

export default WebsocketComponent;
