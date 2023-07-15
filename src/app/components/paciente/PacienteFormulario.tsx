import React, { useState } from "react";
import "./PacienteFormulario.css";

const PacienteFormulario = () => {
  const [abierto, setAbierto] = useState(false);

  const [datosFormulario, setDatosFormulario] = useState({
    cedula: "",
    nombre: "",
    apellido: "",
    fechaDeNacimiento: "",
    telefono: ""
  });

  const clickIcon = () => {
    setAbierto(!abierto);
  };

  const cambiarValor = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDatosFormulario((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const procesarFormulario = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/pacientes", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(datosFormulario)
      });

      if (!response.ok) {
        throw new Error("No se pudo guardar el registro");
      }

      setAbierto(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div onClick={clickIcon}>
        <span>Agregar </span>
      </div>
      {abierto && (
        <form onSubmit={procesarFormulario}>
          <div className="campo">
            <label htmlFor="cedula">Cédula:</label>
            <input
              type="text"
              id="cedula"
              name="cedula"
              value={datosFormulario.cedula}
              onChange={cambiarValor}
              className="input"
            />
          </div>
          <div className="campo">
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={datosFormulario.nombre}
              onChange={cambiarValor}
              className="input"
            />
          </div>
          <div className="campo">
            <label htmlFor="apellido">Apellido:</label>
            <input
              type="text"
              id="apellido"
              name="apellido"
              value={datosFormulario.apellido}
              onChange={cambiarValor}
              className="input"
            />
          </div>
          <div className="campo">
            <label htmlFor="fechaDeNacimiento">Fecha de Nacimiento:</label>
            <input
              type="date"
              id="fechaDeNacimiento"
              name="fechaDeNacimiento"
              value={datosFormulario.fechaDeNacimiento}
              onChange={cambiarValor}
              className="input"
            />
          </div>
          <div className="campo">
            <label htmlFor="telefono">Teléfono:</label>
            <input
              type="text"
              id="telefono"
              name="telefono"
              value={datosFormulario.telefono}
              onChange={cambiarValor}
              className="input"
            />
          </div>
          <button type="submit" className="boton">
            Guardar
          </button>
        </form>
      )}
    </div>
  );
};

export default PacienteFormulario;
