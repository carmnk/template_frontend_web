import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import packageJson from "../package.json";

console.log("app START!!");

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename={packageJson?.homepage}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
