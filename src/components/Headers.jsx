import React from "react";
const API_BASE = "http://localhost:8080";
export default function Header() {
  const handleLogin = () => {
    window.location.href = `${API_BASE}/oauth2/authorization/keycloak`;
  };

  const handleLogout = () => {
    window.location.href = `${API_BASE}/logout-success`;
  };

  return (
    <header className="app-header">
      <div className="logo">
        Medico<span>Cloud</span>
      </div>

      <div style={{ display: "flex", gap: 10 }}>
        <button className="login-btn" onClick={handleLogin}>
          Se connecter
        </button>
        <button className="logout-btn" onClick={handleLogout}>
          Se déconnecter
        </button>
      </div>
    </header>
  );
}
