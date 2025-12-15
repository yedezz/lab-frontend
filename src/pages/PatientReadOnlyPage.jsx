import { useEffect, useState } from "react";
import AppHeader from "../components/AppHeader.jsx";
import { Link } from "react-router-dom";

export default function PatientReadOnlyPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/api/me/requests", {
      credentials: "include", // IMPORTANT pour Keycloak / session
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setRequests(data);
        } else {
          setRequests([]);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const openPdf = async (id) => {
    const res = await fetch(
      `http://localhost:8080/api/me/requests/${id}/report`,
      { credentials: "include" }
    );

    if (res.ok) {
      const url = await res.text();
      window.open(url, "_blank");
    } else {
      alert("PDF indisponible");
    }
  };

  if (loading) return <p>Chargement…</p>;

  return (
    <div className="page">
        <AppHeader showLogin={false} showLogout={true} />
      <h2>👤 Mes résultats d’analyses</h2>

      {requests.length === 0 && <p>Aucun résultat disponible.</p>}

      {requests.map((r) => (
        <div key={r.id} className="card">
          <strong>{r.type}</strong>
          <p>Status : {r.status}</p>

          {r.pdfObjectName && (
            <button onClick={() => openPdf(r.id)}>
              📄 Voir / Télécharger le PDF
            </button>
          )}
        </div>
      ))}

      <Link to="/">⬅ Retour</Link>
    </div>
  );
}
