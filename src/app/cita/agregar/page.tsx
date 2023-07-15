"use client"

import CitaForm from "@/app/components/cita/CitaFormulario"
import "./CitaAddPage.css";



export default function CitaAddPage() {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-8 text-center text-blue-700">Crear Cita</h1>
        <div className="bg-white shadow-md rounded-lg p-6">
          <CitaForm />
        </div>
      </div>
    );
  }