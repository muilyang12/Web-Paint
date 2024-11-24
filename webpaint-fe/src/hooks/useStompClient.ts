import { useCallback, useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

export function useStompClient() {
  const stompClientRef = useRef<Client>();

  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/ws");
    const stompClient = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        console.log("Connected.");

        stompClient.subscribe("/topic/public", (message) => {
          console.log("Received: ", JSON.parse(message.body));
        });
      },
      onStompError: () => {
        console.log("Error occured.");
      },
    });

    stompClient.activate();

    stompClientRef.current = stompClient;

    return () => {
      stompClient.deactivate();
    };
  }, []);

  const sendMessage = useCallback(() => {
    if (!stompClientRef.current) return;
    if (!stompClientRef.current.connected) return;

    stompClientRef.current.publish({
      destination: "/app/chat.sendMessage",
      body: JSON.stringify({
        sender: "User",
        content: "aaaaa",
        type: "CHAT",
      }),
    });
  }, []);

  return { sendMessage };
}
