import React from "react";
import "./AppHeader.css";
const API_BASE = "http://localhost:8080";
export default function AppHeader({
  showLogin = true,
  showLogout = true,
}) {
  const handleLogin = () => {
    // déclenche le flow OIDC via le backend
    window.location.href = `${API_BASE}/oauth2/authorization/keycloak`;
  };

  const handleLogout = () => {
    // déclenche logout Spring + Keycloak
    window.location.href = `${API_BASE}/logout-success`;
  };

  return (
    <header className="app-header">
      <div className="logo">
        Medico<span>Cloud</span>
      </div>

      <div className="header-actions">
        {showLogin && (
          <button className="login-btn" onClick={handleLogin}>
            Se connecter
          </button>
        )}

        {showLogout && (
          <button className="logout-btn" onClick={handleLogout}>
            Se déconnecter
          </button>
        )}
      </div>
    </header>
  );
}
