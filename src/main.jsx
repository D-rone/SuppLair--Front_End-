import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

let root = document.getElementById("root");

window.addEventListener("load", () => {
  document.getElementById("mainLoading").remove();
  root.style.display = "block";
});

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
