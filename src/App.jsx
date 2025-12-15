import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import HomePage from "./pages/HomePage.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import LabAdminPage from "./pages/LabAdminPage.jsx";
import LabPage from "./pages/LabPage.jsx";
import PatientPage from "./pages/PatientPage.jsx";
import PatientsPage from "./pages/PatientsPage.jsx";
import AnalysisPage from "./pages/AnalysisPage.jsx";
import PatientReadOnlyPage from "./pages/PatientReadOnlyPage.jsx";

<Route path="/me" element={<PatientReadOnlyPage />} />

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/me" element={<PatientReadOnlyPage />} />
      {/* ADMIN */}
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/lab-admin" element={<LabAdminPage />} />
      <Route path="/lab" element={<LabPage />} />

      {/* PATIENTS */}
      <Route path="/patients" element={<PatientsPage />} />
      <Route path="/patient/:id" element={<PatientPage />} />

      {/* ANALYSES */}
      <Route path="/analysis/:id" element={<AnalysisPage />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
