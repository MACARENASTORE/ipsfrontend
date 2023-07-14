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

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    
    const cita: Cita = ({
        paciente: e.target.paciente.value,
        medico: e.target.medico.value,
        fecha: e.target.fecha.value,
    });
    

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
        //Clear the form
        e.target.reset();

        //Disable the submit button
        e.target.disabled = true;

        setSubmitted(true); // Set the submitted state to true
        setTimeout(() => {
          setSubmitted(false); // Reset the submitted state after 3 seconds
          //Redirect to the list of counselings
          window.location.href = "/cita/lista";          
        }, 2000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  //Extract the paciente id from the href
const getPacienteId = (pacientes: string) => {
    const pacienteHrefParts = pacientes.split("/");
    const pacienteId = pacienteHrefParts[pacienteHrefParts.length - 1];
    return pacienteId;
};
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <select name="pacientes">
          <option value="0">Seleccione un Estudiante</option>
          {pacientes.map((pacientes) => (
            <option key={getPacienteId(pacientes._links.pacientes.href)} value={pacientes._links.pacientes.href}>
              {pacientes.nombre}
            </option>
          ))}
        </select>
        <select name="medico">
          <option value="0">Seleccione un Medico</option>
          {medicos.map((medico) => (
            <option key={medico._links.medico.href} value={medico._links.medico.href}>
              {medico.nombre}
            </option>
          ))}
        </select>
        <input type="date" name="date" placeholder="Fecha" />
        <button type="submit">Guardar</button>
      </form>
      {submitted && <div className="success-message">Record inserted successfully!</div>}
    </div>
  );
};

export default CitaForm;
