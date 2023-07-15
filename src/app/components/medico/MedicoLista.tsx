import React, { useEffect, useState } from "react";
import "./MedicoLista.css"; // Import CSS for styling

interface Medico {
  nombre: string;
  apellido: string;
  consultorio: string;
  correo: string;
  especialidad: string;
}

const MedicoLista = () => {
  const [medicos, setMedicos] = useState<Medico[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/medicos");
        const data = await response.json();
        setMedicos(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="medico-lista">
      <h2 className="titulo">Lista de Médicos</h2>
      <table className="tabla">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Consultorio</th>
            <th>Correo</th>
            <th>Especialidad</th>
          </tr>
        </thead>
        <tbody>
          {medicos.map((medico, index) => (
            <tr key={index}>
              <td>{medico.nombre}</td>
              <td>{medico.apellido}</td>
              <td>{medico.consultorio}</td>
              <td>{medico.correo}</td>
              <td>{medico.especialidad}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MedicoLista;
