import { useEffect, useState } from "react";
export default function App() {
  const [count, setCount] = useState(0);
  const [start, setStart] = useState(false);

  const updateCount = () => {
    setCount(count + 1);
  };

  const updateStart = () => {
    setStart(!start);
  };

  const resetCount = () => {
    setStart(false);
    setCount(0);
  };

  useEffect(() => {
    if (start) {
      const interval = setInterval(() => updateCount(), 1000);

      return () => clearInterval(interval);
    }
  }, [count, start]);

  return (
    <div className="App">
      {/* <div> */}
      <h1>{count}</h1>
      <button onClick={() => updateStart()}>Start</button>
      <button onClick={() => updateStart()}>Stop</button>
      <button onClick={() => resetCount()}>Reset</button>
    </div>
  );
}
