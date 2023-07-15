"use client"
import React from "react";
import EspecialidadFormulario from "../../components/especialidad/EspecialidadFormulario";
import "./AgregarEspecialidad.css";

const AgregarEspecialidadPage = () => {
  const handleSubmit = () => {
    // Aquí puedes realizar las acciones necesarias después de enviar el formulario
    console.log("Especialidad enviada");
  };

  return (
    <div className="pagina-container">
      <h1 className="titulo-pagina">Agregar Especialidad</h1>
      <div className="formulario-container">
        <EspecialidadFormulario onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default AgregarEspecialidadPage;