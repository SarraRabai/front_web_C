import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import './index.css';
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from './auth/context.jsx'
import { SocketContextProvider } from "./auth/SocketContext.jsx";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    
    <BrowserRouter>
    <AuthProvider>
      <SocketContextProvider>
        <App />
      </SocketContextProvider>
    </AuthProvider>
    </BrowserRouter>
   
  </StrictMode>
);
 