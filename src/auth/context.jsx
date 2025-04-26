// 1. AuthContext.js (version améliorée)
import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
  authState: null,          // Combine user + token
  setAuthState: () => {},   // Fonction unifiée
  isAuthenticated: false    // Flag pratique
});

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(() => {
    // Charge l'état initial depuis localStorage
    const storedData = localStorage.getItem("authState");
    return storedData ? JSON.parse(storedData) : { user: null, token: null };
  });

  // Persiste automatiquement les changements
  useEffect(() => {
    localStorage.setItem("authState", JSON.stringify(authState));
  }, [authState]);

  const isAuthenticated = !!authState.token;

  return (
    <AuthContext.Provider value={{ 
      authState, 
      setAuthState,
      isAuthenticated
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;