import React, { useEffect, useState } from "react";
import "./CitaFormulario.css"; // Import CSS for animation

interface Paciente {
  cedula: number;
  nombre: string;
  apellido: string;
  fechaDeNacimiento: Date;
  _links: Record<string, { href: string }>;
}

interface Medico {
  nombre: string;
  apellido: string;
  consultorio: string;
  correo: string;
  especialidad: string;
  _links: Record<string, { href: string }>;
}

interface Cita {
  paciente: string;
  medico: string;
  fecha: string;
}

const CitaForm = () => {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [medicos, setMedicos] = useState<Medico[]>([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const response = await fetch("http://localhost:8080/pacientes");
        const data = await response.json();
        setPacientes(data._embedded.pacientes);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPacientes();
  }, []);

  useEffect(() => {
    const fetchMedicos = async () => {
      try {
        const response = await fetch("http://localhost:8080/medicos");
        const data = await response.json();
        setMedicos(data._embedded.medicos);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMedicos();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const cita: Cita = {
      paciente: (e.currentTarget.elements.namedItem("pacientes") as HTMLSelectElement).value,
      medico: (e.currentTarget.elements.namedItem("medico") as HTMLSelectElement).value,
      fecha: (e.currentTarget.elements.namedItem("date") as HTMLInputElement).value,
    };

    try {
      const response = await fetch("http://localhost:8080/citas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cita),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        // Clear the form
        (e.currentTarget as HTMLFormElement).reset();

        // Disable the submit button
        const submitButton = e.currentTarget.elements.namedItem("submit") as HTMLButtonElement;
        submitButton.disabled = true;

        setSubmitted(true); // Set the submitted state to true
        setTimeout(() => {
          setSubmitted(false); // Reset the submitted state after 3 seconds
          // Redirect to the list of counselings
          window.location.href = "/cita/lista";
        }, 2000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Extract the paciente id from the href
  const getPacienteId = (paciente: string) => {
    const pacienteHrefParts = paciente.split("/");
    const pacienteId = pacienteHrefParts[pacienteHrefParts.length - 1];
    return pacienteId;
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black text-white">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 className="text-center text-2xl font-bold mb-6">Cita Formulario</h1>
        <div className="mb-4">
          <label htmlFor="pacientes" className="block text-gray-700 font-bold mb-2">
            Seleccione un Paciente:
          </label>
          <select name="pacientes" id="pacientes" className="form-select">
            <option value="0">Seleccione un Paciente</option>
            {pacientes.map((paciente) => (
              <option
                key={getPacienteId(paciente._links.paciente.href)}
                value={paciente._links.paciente.href}
              >
                {paciente.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="medico" className="block text-gray-700 font-bold mb-2">
            Seleccione un Medico:
          </label>
          <select name="medico" id="medico" className="form-select">
            <option value="0">Seleccione un Medico</option>
            {medicos.map((medico) => (
              <option key={medico._links.medico.href} value={medico._links.medico.href}>
                {medico.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="date" className="block text-gray-700 font-bold mb-2">
            Fecha:
          </label>
          <input type="date" name="date" id="date" className="form-input" placeholder="Fecha" />
        </div>
        <button
          type="submit"
          name="submit"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Guardar
        </button>
      </form>
      {submitted && (
        <div className="bg-green-200 text-green-700 rounded px-4 py-2 mt-4">
          ¡Registro insertado exitosamente!
        </div>
      )}
    </div>
  );
};

export default CitaForm;
