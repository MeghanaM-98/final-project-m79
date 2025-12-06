// src/Layout.jsx
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";


function Layout() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="app-shell">
      {/* Top menu only when logged in */}
      {isAuthenticated && (
        <header className="app-header">
          <NavLink to="/dashboard" className="navbar-title-link">
            M79 – Generative AI Dashboard
          </NavLink>

          <nav className="app-header__nav">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive ? "nav-link nav-link--active" : "nav-link"
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/summary"
              className={({ isActive }) =>
                isActive ? "nav-link nav-link--active" : "nav-link"
              }
            >
              Summary
            </NavLink>
            <NavLink
              to="/reports"
              className={({ isActive }) =>
                isActive ? "nav-link nav-link--active" : "nav-link"
              }
            >
              Reports
            </NavLink>
          </nav>

          <button className="btn btn-logout" onClick={handleLogout}>
            Logout
          </button>
        </header>
      )}

      <main className="app-main">
        {/* Dashboard / Summary / Reports will render here */}
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
