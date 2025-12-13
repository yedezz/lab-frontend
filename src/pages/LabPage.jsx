import React from "react";
import AppHeader from "../components/AppHeader.jsx";

export default function LabPage() {
  return (
    <div className="app-root">
      <AppHeader showLogin={false} showLogout={true} />
      <div style={{ maxWidth: 900, margin: "40px auto", color: "white" }}>
        <h2>Laboratoire</h2>
        <p>Page lab (à compléter).</p>
      </div>
    </div>
  );
}
