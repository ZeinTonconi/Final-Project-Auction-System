import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LoginPage from "./pages/LoginPage.tsx";
import {AppRoutes} from "./routes/AppRoutes.tsx";

function App() {

  return (
    <>
        <AppRoutes/>
    </>
  )
}

export default App
