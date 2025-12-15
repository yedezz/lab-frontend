import { useState } from "react";

export default function PatientPage() {
  const [patient] = useState({
    id: 1,
    firstName: "Ali",
    lastName: "Ben Salah",
  });

  const [analyses, setAnalyses] = useState([]);
  const [type, setType] = useState("");
  const [file, setFile] = useState(null);

  const addAnalyse = () => {
    if (!type) return;

    setAnalyses([
      {
        id: Date.now(),
        type,
        date: new Date().toISOString().split("T")[0],
        status: "DISPONIBLE",
        pdf: file
          ? {
              name: file.name,
              url: URL.createObjectURL(file),
            }
          : null,
      },
      ...analyses,
    ]);

    setType("");
    setFile(null);
  };

  const deleteAnalyse = (id) => {
    setAnalyses(analyses.filter((a) => a.id !== id));
  };

  return (
    <div className="page">
      <h2>🧑‍⚕️ {patient.firstName} {patient.lastName}</h2>

      <h3>➕ Nouvelle analyse</h3>
      <input
        placeholder="Type d'analyse"
        value={type}
        onChange={(e) => setType(e.target.value)}
      />
      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button onClick={addAnalyse}>Ajouter</button>

      <hr />

      <h3>📜 Analyses</h3>

      {analyses.map((a) => (
        <div key={a.id} className="card">
          <strong>{a.type}</strong>
          <p>Date : {a.date}</p>
          <p>Status : {a.status}</p>

          {a.pdf && (
            <>
              <a href={a.pdf.url} target="_blank">👁️ Voir</a>{" "}
              <a href={a.pdf.url} download>⬇️ Télécharger</a>
            </>
          )}

          <div>
            <button onClick={() => deleteAnalyse(a.id)}>🗑️</button>
            <button>📩 Envoyer</button>
          </div>
        </div>
      ))}
    </div>
  );
}
