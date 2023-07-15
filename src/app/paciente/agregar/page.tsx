
"use client"

import React from "react";
import PacienteFormulario from "../../components/paciente/PacienteFormulario"
import "./PacienteAgregar.css";


const PacienteAddPage = () => {
  return (
    <div className="container">
      <h1 className="page-title">Agregar Paciente</h1>
      <div className="form-container">
        <PacienteFormulario />
      </div>
    </div>
  );
};

export default PacienteAddPage;