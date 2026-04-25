import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/")
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.message);
      })
      .catch((error) => {
        console.error("Error connecting to backend:", error);
        setMessage("Failed to connect to backend");
      });
  }, []);

  return (
    <div className="App">
      <h1>Frontend + Backend Connection Test</h1>
      <div className="card">
        <p>
          Status: <strong>{message}</strong>
        </p>
      </div>
    </div>
  );
}

export default App;
