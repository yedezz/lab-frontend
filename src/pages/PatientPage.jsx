import React from "react";
import AppHeader from "../components/AppHeader.jsx";

export default function PatientPage() {
  return (
    <div className="app-root">
      <AppHeader showLogin={false} showLogout={true} />
      <div style={{ maxWidth: 900, margin: "40px auto", color: "white" }}>
        <h2>Patient</h2>
        <p>Page patient (à compléter).</p>
      </div>
    </div>
  );
}
