const API = "http://localhost:8080/api";

// PATIENTS
export const getPatients = () =>
  fetch(`${API}/patients`).then(r => r.json());

export const createPatient = (patient) =>
  fetch(`${API}/patients`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(patient),
  }).then(r => r.json());

export const updatePatient = (id, patient) =>
  fetch(`http://localhost:8080/api/patients/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(patient),
  }).then(r => r.json());

export const getPatient = (id) =>
  fetch(`${API}/patients/${id}`).then(r => r.json());

// ANALYSES
export const getAnalyses = (patientId) =>
  fetch(`${API}/patients/${patientId}/analyses`).then(r => r.json());

export const addAnalyse = (patientId, analyse) =>
  fetch(`${API}/patients/${patientId}/analyses`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(analyse),
  }).then(r => r.json());

// 👉 CET EXPORT EST OBLIGATOIRE
export const getAnalyse = (id) =>
  fetch(`${API}/analyses/${id}`).then(r => r.json());

export const deleteAnalyse = (id) =>
  fetch(`${API}/analyses/${id}`, { method: "DELETE" });
export const uploadPdf = async (file) => {
  const data = new FormData();
  data.append("file", file);

  const res = await fetch("http://localhost:8080/api/files/upload", {
    method: "POST",
    body: data,
  });

  return res.text(); // objectName
};

export const getPdfUrl = async (objectName) => {
  const res = await fetch(
    `http://localhost:8080/api/files/url/${objectName}`
  );
  return res.text();
};
