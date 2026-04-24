// main.tsx - entry point aplikasi
// Me-render <App /> ke dalam <div id="root"> pada index.html

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// StrictMode = mode development yang membantu mendeteksi bug (double render, dsb.)
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
