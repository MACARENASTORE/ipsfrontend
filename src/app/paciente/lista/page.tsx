"use client"
import React from "react";
import PacienteLista from "../../components/paciente/PacienteLista";
import "./PacienteListPage.css";

const PacienteListPage = () => {
  return (
    <div className="page-container">
      <h1 className="page-title">Lista de Pacientes</h1>
      <div className="paciente-list-container">
        <PacienteLista />
      </div>
    </div>
  );
};

export default PacienteListPage;
