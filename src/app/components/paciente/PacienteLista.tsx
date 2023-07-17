import React, { useEffect, useState } from "react";
import "./PacienteLista.css"; // Import CSS for styling

interface Paciente {
  cedula: number;
  nombre: string;
  apellido: string;
  fechaDeNacimiento: string;
  telefono: string;
}

const PacienteLista: React.FC = () => {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);

  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const response = await fetch('http://localhost:8080/pacientes');
        if (!response.ok) {
          throw new Error('No se pudo obtener la lista de pacientes');
        }
        const data = await response.json();
        setPacientes(data._embedded.pacientes);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPacientes();
  }, []);

  return (
    <div className="paciente-lista">
      <h2 className="titulo">Lista de Pacientes</h2>
      <table className="tabla">
        <thead>
          <tr>
            <th>Cédula</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Fecha de Nacimiento</th>
            <th>Teléfono</th>
          </tr>
        </thead>
        <tbody>
          {pacientes.map((paciente) => (
            <tr key={paciente.cedula}>
              <td>{paciente.cedula}</td>
              <td>{paciente.nombre}</td>
              <td>{paciente.apellido}</td>
              <td>{paciente.fechaDeNacimiento}</td>
              <td>{paciente.telefono}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PacienteLista;
