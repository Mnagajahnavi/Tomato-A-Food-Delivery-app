import React from 'react'
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import StoreContextProvider from "./context/ShowContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StoreContextProvider>
      <App />
    </StoreContextProvider>
  </BrowserRouter>
);
