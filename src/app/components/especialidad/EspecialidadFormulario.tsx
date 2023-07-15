import React, { useState } from "react";
import "./EspecialidadFormulario.css";

interface Especialidad {
  nombre: string;
  code: string;
}

interface EspecialidadFormularioProps {
  onSubmit: () => void;
}

const EspecialidadFormulario: React.FC<EspecialidadFormularioProps> = ({ onSubmit }) => {
  const [especialidad, setEspecialidad] = useState<Especialidad>({
    nombre: "",
    code: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEspecialidad((prevEspecialidad) => ({
      ...prevEspecialidad,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/pacientes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(especialidad),
      });

      if (response.ok) {
        // La solicitud fue exitosa
        setEspecialidad({
          nombre: "",
          code: "",
        });
        onSubmit();
      } else {
        // La solicitud falló
        console.error("Error al enviar los datos");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="especialidad-formulario-container">
      <h2 className="titulo">Agregar Especialidad</h2>
      <form onSubmit={handleSubmit} className="formulario">
        <div className="campo">
          <label htmlFor="nombre" className="label">Nombre:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={especialidad.nombre}
            onChange={handleChange}
            className="input"
          />
        </div>
        <div className="campo">
          <label htmlFor="code" className="label">Código:</label>
          <input
            type="text"
            id="code"
            name="code"
            value={especialidad.code}
            onChange={handleChange}
            className="input"
          />
        </div>
        <button type="submit" className="boton">
          Guardar
        </button>
      </form>
    </div>
  );
};

export default EspecialidadFormulario;
