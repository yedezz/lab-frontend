import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  getPatient,
  updatePatient,
  getAnalyses,
  addAnalyse,
  deleteAnalyse,
  uploadPdf,
  getPdfUrl,
} from "../services/api";

export default function PatientPage() {
  const { id } = useParams();

  /* ==========================
     ÉTAT PATIENT
  ========================== */
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    email: "",
    phone: "",
    cin: "",
    socialSecurityNumber: "",
  });

  const [saved, setSaved] = useState(false);

  /* ==========================
     ÉTAT ANALYSES
  ========================== */
  const [analyses, setAnalyses] = useState([]);
  const [newAnalyseType, setNewAnalyseType] = useState("");
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  /* ==========================
     CHARGEMENT INITIAL
  ========================== */
  useEffect(() => {
    getPatient(id).then((p) => {
      setForm({
        firstName: p.firstName || "",
        lastName: p.lastName || "",
        dateOfBirth: p.dateOfBirth || "",
        email: p.email || "",
        phone: p.phone || "",
        cin: p.cin || "",
        socialSecurityNumber: p.socialSecurityNumber || "",
      });
    });

    getAnalyses(id).then(setAnalyses);
  }, [id]);

  /* ==========================
     HANDLERS PATIENT
  ========================== */
  const handleChange = (e) => {
    setSaved(false);
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const savePatient = async () => {
    await updatePatient(id, form);
    setSaved(true);
  };

  /* ==========================
     HANDLERS ANALYSES
  ========================== */
  const createAnalyse = async () => {
    if (!newAnalyseType) return;

    let objectName = null;

    if (file) {
      setUploading(true);
      objectName = await uploadPdf(file);
      setUploading(false);
    }

    const created = await addAnalyse(id, {
      type: newAnalyseType,
      status: "DISPONIBLE",
      pdfObjectName: objectName,
    });

    setAnalyses([created, ...analyses]);
    setNewAnalyseType("");
    setFile(null);
  };

  const removeAnalyse = async (analyseId) => {
    await deleteAnalyse(analyseId);
    setAnalyses(analyses.filter((a) => a.id !== analyseId));
  };

  const openPdf = async (objectName) => {
    const url = await getPdfUrl(objectName);
    window.open(url, "_blank");
  };

  /* ==========================
     RENDER
  ========================== */
  return (
    <div className="page">
      <Link to="/patients">⬅ Retour</Link>

      {/* ==========================
          MODIFICATION PATIENT
      ========================== */}
      <h2>🧑‍⚕️ Fiche Patient</h2>

      <div className="card">
        <input
          name="firstName"
          placeholder="Prénom"
          value={form.firstName}
          onChange={handleChange}
        />

        <input
          name="lastName"
          placeholder="Nom"
          value={form.lastName}
          onChange={handleChange}
        />

        <input
          type="date"
          name="dateOfBirth"
          value={form.dateOfBirth}
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          name="phone"
          placeholder="Téléphone"
          value={form.phone}
          onChange={handleChange}
        />

        <input
          name="cin"
          placeholder="CIN"
          value={form.cin}
          onChange={handleChange}
        />

        <input
          name="socialSecurityNumber"
          placeholder="N° Sécurité sociale"
          value={form.socialSecurityNumber}
          onChange={handleChange}
        />

        <button onClick={savePatient}>💾 Enregistrer</button>

        {saved && <p style={{ color: "green" }}>✔ Patient mis à jour</p>}
      </div>

      {/* ==========================
          AJOUT ANALYSE
      ========================== */}
      <h3>➕ Nouvelle analyse</h3>

      <div className="card">
        <input
          placeholder="Type d'analyse (PCR, Glycémie...)"
          value={newAnalyseType}
          onChange={(e) => setNewAnalyseType(e.target.value)}
        />

        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button onClick={createAnalyse} disabled={uploading}>
          {uploading ? "Upload..." : "Créer analyse"}
        </button>
      </div>

      {/* ==========================
          LISTE ANALYSES
      ========================== */}
      <h3>📜 Analyses</h3>

      {analyses.length === 0 && <p>Aucune analyse</p>}

      {analyses.map((a) => (
  <div key={a.id} className="card">
    <strong>{a.type}</strong>
    <p>Status : {a.status}</p>

    {a.pdfObjectName && (
      <button onClick={() => openPdf(a.pdfObjectName)}>
        📄 Voir PDF
      </button>
    )}

    <button onClick={() => removeAnalyse(a.id)}>🗑️ Supprimer</button>
  </div>
))}
    </div>
  );
}
