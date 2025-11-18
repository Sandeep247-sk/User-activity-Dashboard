import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import DashboardPage from "./pages/Dashboard.jsx";
import LoginPage from "./pages/Login.jsx";
import NotFoundPage from "./pages/NotFound.jsx";

const readAuthState = () => {
  if (typeof window === "undefined") return false;
  return window.sessionStorage.getItem("dashboardAuthenticated") === "true";
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(readAuthState);

  useEffect(() => {
    const handleStorage = () => setIsAuthenticated(readAuthState());
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const handleLoginSuccess = (email) => {
    window.sessionStorage.setItem("dashboardAuthenticated", "true");
    window.localStorage.setItem("lastLoggedInUser", email);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    window.sessionStorage.removeItem("dashboardAuthenticated");
    setIsAuthenticated(false);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />}
      />
      <Route
        path="/login"
        element={
          isAuthenticated ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <LoginPage onSuccess={handleLoginSuccess} />
          )
        }
      />
      <Route
        path="/dashboard"
        element={
          isAuthenticated ? (
            <DashboardPage onLogout={handleLogout} />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;

