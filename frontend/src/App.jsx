// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import Layout from "./components/Layout";
import Login from "./pages/Login";     // adjust paths if needed
import Dashboard from "./pages/Dashboard";
import Summary from "./pages/Summary";
import Reports from "./pages/Reports";

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Public route */}
      <Route
        path="/login"
        element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />
        }
      />

      {/* All authenticated routes use the Layout with top menu */}
      <Route element={<Layout />}>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/summary"
          element={
            isAuthenticated ? <Summary /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/reports"
          element={
            isAuthenticated ? <Reports /> : <Navigate to="/login" replace />
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
