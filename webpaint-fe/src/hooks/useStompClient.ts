import { useCallback, useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import {
  SendDrawActionParams,
  SendCursorParams,
  AddEventToStompClientParams,
} from "./useStompClient.types";

export default function useStompClient() {
  const stompClientRef = useRef<Client>();
  const [isStompClientConnected, setIsStompClientConnected] = useState<boolean>(false);

  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/ws");
    const stompClient = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        console.log("Connected.");

        setIsStompClientConnected(true);
      },
      onStompError: () => {
        console.log("Error occurred.");
      },
    });

    stompClient.activate();

    stompClientRef.current = stompClient;

    return () => {
      stompClient.deactivate();
    };
  }, []);

  const sendDrawAction = useCallback(({ relativeX, relativeY, name }: SendDrawActionParams) => {
    if (!stompClientRef.current) return;
    if (!stompClientRef.current.connected) return;

    stompClientRef.current.publish({
      destination: "/app/draw",
      body: JSON.stringify({
        relativeX,
        relativeY,
        name,
      }),
    });
  }, []);

  const sendCursor = useCallback(({ relativeX, relativeY, name }: SendCursorParams) => {
    if (!stompClientRef.current) return;
    if (!stompClientRef.current.connected) return;

    stompClientRef.current.publish({
      destination: "/app/cursor",
      body: JSON.stringify({
        relativeX,
        relativeY,
        name,
      }),
    });
  }, []);

  const addEventToStompClient = ({ topic, callback }: AddEventToStompClientParams) => {
    if (!stompClientRef.current) return;

    stompClientRef.current.subscribe(topic, callback);
  };

  return { isStompClientConnected, sendDrawAction, sendCursor, addEventToStompClient };
}
