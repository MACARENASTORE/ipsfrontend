"use client"

import React from "react";
import MedicoLista from "@/app/components/medico/MedicoLista";
import "./MedicoLista.css"; // Import CSS for styling

const MedicoListaPage = () => {
  return (
    <div className="container">
      <h1 className="page-title">Lista de Médicos</h1>
      <div className="medico-lista-container">
        <MedicoLista />
      </div>
    </div>
  );
};

export default MedicoListaPage;