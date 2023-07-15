"use client"

import React from "react";
import MedicoForm from "../../components/medico/MedicoFormulario";
import "./MedicoAgregar.css";

const MedicoAddPage = () => {
  return (
    <div className="container bg-black text-white">
      <h1 className="page-title text-center mb-4">Agregar Médico</h1>
      <div className="form-container p-4">
        <MedicoForm />
      </div>
    </div>
  );
};

export default MedicoAddPage;
