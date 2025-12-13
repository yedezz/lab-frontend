import React from "react";
import AppHeader from "../components/AppHeader.jsx";
import "../App.css";

export default function HomePage() {
  return (
    <div className="app-root">
      <AppHeader showLogin={true} showLogout={false} />

      <main className="hero">
        <section className="hero-text">
          <h1>Medico Cloud</h1>
          <h2>Le portail laboratoire qui simplifie la vie.</h2>
          <p>
            Medico Cloud centralise tous vos résultats d’analyses en un seul
            endroit, accessible à tout moment.
          </p>

          <ul className="hero-bullets">
            <li>✔ Accès rapide et sécurisé</li>
            <li>✔ Partage fluide</li>
            <li>✔ Moins de papier</li>
          </ul>
        </section>

        <section className="hero-visual">
          <div className="hero-card">
            <div className="hero-badge">Portail Patient & Labo</div>
            <div className="hero-graph" />
            <p className="hero-caption">
              Visualisez vos résultats et restez connectés au laboratoire.
            </p>
          </div>
        </section>
      </main>

      <footer className="app-footer">
        © {new Date().getFullYear()} Medico Cloud
      </footer>
    </div>
  );
}

