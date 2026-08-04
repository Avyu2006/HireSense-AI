import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";

import "./index.css";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>

    <App />

    <Toaster
      position="top-right"
      reverseOrder={false}
      toastOptions={{
        duration: 3000,
        style: {
          background: "#0f172a",
          color: "#fff",
          borderRadius: "12px",
          padding: "14px",
        },
        success: {
          style: {
            background: "#16a34a",
          },
        },
        error: {
          style: {
            background: "#dc2626",
          },
        },
      }}
    />

  </React.StrictMode>
);