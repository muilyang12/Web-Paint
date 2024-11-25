import { messageCallbackType } from "@stomp/stompjs";

export interface SendDrawActionParams {
  relativeX: number;
  relativeY: number;
  name: string;
}

export type SendCursorParams = SendDrawActionParams;

export interface AddEventToStompClientParams {
  topic: string;
  callback: messageCallbackType;
}
