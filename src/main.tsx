import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { BrowserRouter } from "react-router";

import { ErrorBoundary } from "react-error-boundary";

import App from "./App.tsx";
import Toaster from "./components/Toaster/Toaster.tsx";
import ErrorPage from "./pages/ErrorPage/ErrorPage.tsx";

import "./index.css";
import "./styles/colors.css";
import "./styles/shadow.css";
import "./styles/shapes.css";
import "./styles/typography.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary fallback={<ErrorPage />}>
      <BrowserRouter>
        <App />
        <Toaster />
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>,
);
