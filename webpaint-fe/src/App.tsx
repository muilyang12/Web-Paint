import "./App.css";
import { useStompClient } from "./hooks/useStompClient";

function App() {
  const { sendMessage } = useStompClient();
  const handleClick = () => {
    sendMessage();
  };

  return (
    <>
      <div id="hello" onClick={handleClick}>
        Hello !!
      </div>
    </>
  );
}

export default App;
