import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPatients, createPatient } from "../services/api";

export default function PatientsPage() {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    email: "",
    phone: "",
    cin: "",
    socialSecurityNumber: "",
  });

  useEffect(() => {
    getPatients().then(setPatients);
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const addPatient = async () => {
    if (!form.firstName || !form.lastName || !form.email) {
      alert("Prénom, nom et email sont obligatoires");
      return;
    }

    const created = await createPatient(form);
    setPatients([...patients, created]);

    // reset form
    setForm({
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      email: "",
      phone: "",
      cin: "",
      socialSecurityNumber: "",
    });
  };

  const filteredPatients = patients.filter((p) =>
    `${p.firstName} ${p.lastName}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="page">
      <h2>👨‍👩‍👧‍👦 Patients</h2>

      {/* ➕ AJOUT PATIENT */}
      <h3>➕ Ajouter un patient</h3>

      <div className="card">
        <input
          name="firstName"
          placeholder="Prénom *"
          value={form.firstName}
          onChange={handleChange}
        />

        <input
          name="lastName"
          placeholder="Nom *"
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
          placeholder="Email *"
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

        <button onClick={addPatient}>Créer le patient</button>
      </div>

      <hr />

      {/* 🔍 RECHERCHE */}
      <input
        placeholder="🔍 Rechercher un patient"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* 📋 LISTE */}
      <ul>
        {filteredPatients.map((p) => (
          <li key={p.id}>
            <Link to={`/patient/${p.id}`}>
              {p.firstName} {p.lastName}
            </Link>
            {" – "}
            <small>{p.email}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}
