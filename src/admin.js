import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./pages/App";
import "./locales/i18n";
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("qr-admin-app");
  if (typeof container !== "undefined" && container !== null) {
    const root = createRoot(container);
    root.render(<App user="admin" />);
  }
});
