import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import LoginPage from "./pages/LoginPage.tsx";
import { ErrorBoundary } from "react-error-boundary";
import { AppRoutes } from "./routes/AppRoutes.tsx";
import OhNoPage from "./pages/OhNoPage";
import { BetButton } from "./components/BetButton.tsx";

function App() {
  return (
    <>
        <AppRoutes />
    </>
  );
}

export default App;
