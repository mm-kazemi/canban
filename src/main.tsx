import { createRoot } from "react-dom/client";

import { BrowserRouter } from "react-router";

import { ErrorBoundary } from "react-error-boundary";

import App from "./App.tsx";
import ErrorPage from "./pages/ErrorPage/ErrorPage.tsx";

import "./index.css";
import "./styles/colors.css";
import "./styles/shadow.css";
import "./styles/shapes.css";
import "./styles/typography.css";

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary fallback={<ErrorPage />}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ErrorBoundary>,
);
