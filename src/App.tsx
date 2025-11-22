import type { ReactNode } from "react";

import { Route, Routes } from "react-router";

import HomePage from "./pages/HomePage/HomePage.tsx";

function App(): ReactNode {
  return (
    <Routes>
      <Route index element={<HomePage />} />
    </Routes>
  );
}

export default App;
