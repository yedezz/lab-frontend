import React, { useState } from "react";
import "../App.css";

const API_BASE = "http://localhost:8080";

export default function AdminPage() {
  const [form, setForm] = useState({
    labName: "",
    labCity: "",
    labContactEmail: "",
    adminUsername: "",
    adminEmail: "",
    adminTempPassword: "",
  });

  const [labs, setLabs] = useState([]);
  const [labAdmins, setLabAdmins] = useState([]);

  const handleLogout = () => {
    // logout Spring + Keycloak
    window.location.href = `${API_BASE}/logout-success`;
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API_BASE}/admin/labs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert("Labo créé");
      setForm({
        labName: "",
        labCity: "",
        labContactEmail: "",
        adminUsername: "",
        adminEmail: "",
        adminTempPassword: "",
      });
    } else {
      alert("Erreur lors de la création");
    }
  };

  return (
    <div className="app-root">
      {/* ===== HEADER ===== */}
      <header className="app-header">
        <div className="logo">
          Medico<span>Cloud</span>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          Se déconnecter
        </button>
      </header>

      <div style={{ maxWidth: 900, margin: "40px auto", color: "white" }}>
        <h2>Admin – Gestion des laboratoires</h2>

        <h3>Créer un laboratoire</h3>
        <form onSubmit={handleSubmit} className="admin-form">
          <input name="labName" placeholder="Nom labo" value={form.labName} onChange={handleChange} />
          <input name="labCity" placeholder="Ville" value={form.labCity} onChange={handleChange} />
          <input
            name="labContactEmail"
            placeholder="Email labo"
            value={form.labContactEmail}
            onChange={handleChange}
          />
          <input
            name="adminUsername"
            placeholder="Login admin"
            value={form.adminUsername}
            onChange={handleChange}
          />
          <input
            name="adminEmail"
            placeholder="Email admin"
            value={form.adminEmail}
            onChange={handleChange}
          />
          <input
            name="adminTempPassword"
            placeholder="Mot de passe temporaire"
            type="password"
            value={form.adminTempPassword}
            onChange={handleChange}
          />

          <button type="submit">Créer</button>
        </form>
      </div>
    </div>
  );
}
