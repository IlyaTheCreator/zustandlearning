import ReactDOM from "react-dom/client";
import { App } from "./view/App";

import "./view/styles/reset.scss";
import "./view/styles/common.scss";
import React from "react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
