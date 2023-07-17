import React, { useEffect, useState } from "react";
import "./CitaLista.css"; // Import CSS for styling

interface Cita {
  fecha: string | null;
  medico: Medico;
  paciente: Paciente;
}

interface Medico {
  nombre: string;
  // Add more properties specific to the medico if needed
}

interface Paciente {
  nombre: string;
  // Add more properties specific to the paciente if needed
}

const CitaTable = () => {
  const [citas, setCitas] = useState<Cita[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/citas");
        const data = await response.json();

        const citaData = [];
        for (const cita of data._embedded.citas) {
          const medicoResponse = await fetch(cita._links.medico.href);
          if (!medicoResponse.ok) {
            continue;
          }

          const medicoData = await medicoResponse.json();

          const pacienteResponse = await fetch(cita._links.paciente.href);
          const pacienteData = await pacienteResponse.json();

          citaData.push({
            medico: medicoData,
            paciente: pacienteData,
            fecha: cita.fecha,
          });
        }

        setCitas(citaData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Nombre Médico</th>
          <th>Nombre Paciente</th>
          <th>Fecha</th>
        </tr>
      </thead>
      <tbody>
        {citas.map((cita, index) => (
          <tr key={index}>
            <td>{cita.medico.nombre}</td>
            <td>{cita.paciente.nombre}</td>
            <td>{cita.fecha}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CitaTable;
