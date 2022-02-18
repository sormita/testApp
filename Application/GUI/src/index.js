import React from "react";
import ReactDOM from "react-dom";
import { SessionProvider } from "./components/session";
import App from "./components/App";

ReactDOM.render(
  <SessionProvider>
    <App />
  </SessionProvider>,
  document.getElementById("root")
);
