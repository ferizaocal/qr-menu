import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./pages/App";

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("qr-client-app");
  if (typeof container !== "undefined" && container !== null) {
    const root = createRoot(container);
    root.render(<App user={"client"} />);
  }
});
