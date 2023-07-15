"use client"
import React from "react";
import EspecialidadLista from "../../components/especialidad/EspecialidadLista";
import "./EspecialidadListaPage.css";

const EspecialidadListaPage = () => {
  return (
    <div className="especialidad-lista-page">
      <h1 className="titulo">Lista de Especialidades</h1>
      <EspecialidadLista />
    </div>
  );
};

export default EspecialidadListaPage;
