import { useEffect } from "react";
import useUrlQuery from "./useUrlQuery";
import {
  AddEventToStompClientParams,
  SendCursorParams,
  SendDrawActionParams,
} from "./useStompClient.types";

interface UseCanvasEventParams {
  isStompClientConnected: boolean;
  sendDrawAction: (params: SendDrawActionParams) => void;
  sendCursor: (params: SendCursorParams) => void;
  addEventToStompClient: (params: AddEventToStompClientParams) => void;
}

export default function useCanvasEvent(params: UseCanvasEventParams) {
  const { isStompClientConnected, sendDrawAction, sendCursor, addEventToStompClient } = params;

  const color = "#000000";
  const lineWidth = 2.5;

  const urlQuery = useUrlQuery();
  const name = urlQuery.get("name") ?? "";

  useEffect(() => {
    if (!isStompClientConnected) return;

    const canvas = document.querySelector("#web-paint-canvas") as HTMLCanvasElement;

    canvas.width = canvas.getBoundingClientRect().width;
    canvas.height = canvas.getBoundingClientRect().height;

    const context = canvas.getContext("2d") as CanvasRenderingContext2D;
    context.strokeStyle = color;
    context.lineWidth = lineWidth;

    let isPainting = false;

    const startDrawing = () => {
      isPainting = true;
    };
    const stopDrawing = () => {
      isPainting = false;
    };

    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseleave", stopDrawing);

    const handlePointerMove = (event: PointerEvent) => {
      const x = event.offsetX;
      const y = event.offsetY;

      if (isPainting) {
        context.lineTo(x, y);
        context.stroke();
      } else {
        context.beginPath();
        context.moveTo(x, y);
      }

      const relativeX = x / canvas.getBoundingClientRect().width;
      const relativeY = y / canvas.getBoundingClientRect().height;

      if (isPainting)
        sendDrawAction({
          relativeX,
          relativeY,
          name,
        });
      else
        sendCursor({
          relativeX,
          relativeY,
          name,
        });
    };

    canvas.addEventListener("pointermove", handlePointerMove);
  }, [isStompClientConnected, sendDrawAction, sendCursor, name]);

  useEffect(() => {
    if (!isStompClientConnected) return;

    const canvas = document.querySelector("#web-paint-canvas") as HTMLCanvasElement;
    const context = canvas.getContext("2d") as CanvasRenderingContext2D;

    if (!canvas || !context) return;

    addEventToStompClient({
      topic: "/topic/draw",
      callback: (message) => {
        console.log("Drawn: ", JSON.parse(message.body));

        const data: SendDrawActionParams = JSON.parse(message.body);
        const { relativeX, relativeY, name: senderName } = data;

        if (senderName === name) return;

        const x = relativeX * canvas.getBoundingClientRect().width;
        const y = relativeY * canvas.getBoundingClientRect().height;

        context.lineTo(x, y);
        context.stroke();
      },
    });

    addEventToStompClient({
      topic: "/topic/cursor",
      callback: (message) => {
        console.log("Cursor: ", JSON.parse(message.body));

        const data: SendDrawActionParams = JSON.parse(message.body);
        const { relativeX, relativeY, name: senderName } = data;

        if (senderName === name) return;

        const x = relativeX * canvas.getBoundingClientRect().width;
        const y = relativeY * canvas.getBoundingClientRect().height;

        context.beginPath();
        context.moveTo(x, y);
      },
    });
  }, [isStompClientConnected]);
}
