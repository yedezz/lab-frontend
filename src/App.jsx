import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import LabAdminPage from "./pages/LabAdminPage.jsx";
import LabPage from "./pages/LabPage.jsx";
import PatientPage from "./pages/PatientPage.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="/admin" element={<AdminPage />} />
      <Route path="/lab-admin" element={<LabAdminPage />} />
      <Route path="/lab" element={<LabPage />} />
      <Route path="/patient" element={<PatientPage />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
