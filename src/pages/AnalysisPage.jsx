import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getAnalyse } from "../services/api";

export default function AnalysisPage() {
  const { id } = useParams();
  const [analyse, setAnalyse] = useState(null);

  useEffect(() => {
    getAnalyse(id).then(setAnalyse);
  }, [id]);

  if (!analyse) return <p>Chargement...</p>;

  return (
    <div className="page">
      <Link to="/patients">⬅ Retour</Link>

      <h2>🧪 Analyse #{analyse.id}</h2>
      <p><strong>Type :</strong> {analyse.type}</p>
      <p><strong>Date :</strong> {analyse.date}</p>
      <p><strong>Status :</strong> {analyse.status}</p>

      <p>📄 PDF : à brancher MinIO (étape 3)</p>
    </div>
  );
}
