import React, { useEffect, useState } from "react";
import "./PacienteFormulario.css"; // Import CSS for styling

interface Especialidad {
  nombre: string;
  code: number;
  _links: Record<string, { href: string }>;
}

interface Paciente {
  cedula: string;
  nombre: string;
  apellido: string;
  fechaDeNacimiento: string;
  telefono: string;
}

const PacienteFormulario = () => {
  const [especialidades, setEspecialidades] = useState<Especialidad[]>([]);
  const [paciente, setPaciente] = useState<Paciente>({
    cedula: "",
    nombre: "",
    apellido: "",
    fechaDeNacimiento: "",
    telefono: "",
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchEspecialidades = async () => {
      try {
        const response = await fetch("http://localhost:8080/especialidades");
        const data = await response.json();
        setEspecialidades(data._embedded.especialidades);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEspecialidades();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaciente((prevState) => ({
      ...prevState,
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
        body: JSON.stringify(paciente),
      });

      const data = await response.json();
      console.log(data);

      e.currentTarget.reset(); // Clear the form
      setSubmitted(true); // Set the submitted state to true
      setTimeout(() => setSubmitted(false), 3000); // Reset the submitted state after 3 seconds
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="form-container">
      <h2 className="titulo">Agregar Paciente</h2>
      <form onSubmit={handleSubmit} className="formulario">
        <div className="campo">
          <label htmlFor="cedula">Cédula:</label>
          <input
            type="text"
            id="cedula"
            name="cedula"
            value={paciente.cedula}
            onChange={handleChange}
            className="input"
          />
        </div>
        <div className="campo">
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={paciente.nombre}
            onChange={handleChange}
            className="input"
          />
        </div>
        <div className="campo">
          <label htmlFor="apellido">Apellido:</label>
          <input
            type="text"
            id="apellido"
            name="apellido"
            value={paciente.apellido}
            onChange={handleChange}
            className="input"
          />
        </div>
        <div className="campo">
          <label htmlFor="fechaDeNacimiento">Fecha de Nacimiento:</label>
          <input
            type="date"
            id="fechaDeNacimiento"
            name="fechaDeNacimiento"
            value={paciente.fechaDeNacimiento}
            onChange={handleChange}
            className="input"
          />
        </div>
        <div className="campo">
          <label htmlFor="telefono">Teléfono:</label>
          <input
            type="text"
            id="telefono"
            name="telefono"
            value={paciente.telefono}
            onChange={handleChange}
            className="input"
          />
        </div>
        <button type="submit" className="boton">
          Guardar
        </button>
      </form>
      {submitted && <div className="mensaje">¡Paciente agregado exitosamente!</div>}
    </div>
  );
};

export default PacienteFormulario;
