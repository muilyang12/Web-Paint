import "./App.css";
import useStompClient from "./hooks/useStompClient";
import useCanvasEvent from "./hooks/useCanvasDrawing";

function App() {
  const { isStompClientConnected, sendDrawAction, sendCursor, addEventToStompClient } =
    useStompClient();
  useCanvasEvent({ isStompClientConnected, sendDrawAction, sendCursor, addEventToStompClient });

  return <canvas id="web-paint-canvas" />;
}

export default App;
