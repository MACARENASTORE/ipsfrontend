"use client"
import React from "react";
import CitaTable from "@/app/components/cita/CitaLista";
import "./CitaListaPage.css"; // Import CSS for styling

const CitaListaPage = () => {
  return (
    <div className="container">
      <h1 className="page-title">Lista de Citas</h1>
      <CitaTable />
    </div>
  );
};

export default CitaListaPage;
