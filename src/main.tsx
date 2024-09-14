import { StrictMode } from "react";
import App from "./App.tsx";
import "./index.css";
import { createRoot } from "react-dom/client";
import ContextProvider from "./lib/ContextProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ContextProvider>
    <App></App>
    </ContextProvider>
  </StrictMode>
);
