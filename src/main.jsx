import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

setTimeout(() => {
  ReactDOM.createRoot(document.getElementById("root")).render(<App />);
}, 2000); // delay proposital
