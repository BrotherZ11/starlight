import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { WalletProvider } from "./context/WalletContext.jsx";
import { HashRouter as Router } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <WalletProvider>
      <Router>
        <App />
      </Router>
    </WalletProvider>
  </React.StrictMode>
);