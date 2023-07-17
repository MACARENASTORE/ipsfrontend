import React, { useEffect, useState } from "react";
import "./EspecialidadLista.css";

interface Especialidad {
  idEspecialidad: number;
  nombre: string;
  code: string;
}

const EspecialidadLista: React.FC = () => {
  const [especialidades, setEspecialidades] = useState<Especialidad[]>([]);

  useEffect(() => {
    const fetchEspecialidades = async () => {
      try {
        const response = await fetch("http://localhost:8080/especialidades");
        if (!response.ok) {
          throw new Error('No se pudo obtener la lista de especialidades');
        }
        const data = await response.json();
        setEspecialidades(data._embedded.especialidades);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEspecialidades();
  }, []);

  return (
    <div className="especialidad-lista-container">
      <h2 className="titulo">Lista de Especialidades</h2>
      <table className="tabla-especialidades">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Código</th>
          </tr>
        </thead>
        <tbody>
          {especialidades.map((especialidad) => (
            <tr key={especialidad.idEspecialidad}>
              <td>{especialidad.idEspecialidad}</td>
              <td>{especialidad.nombre}</td>
              <td>{especialidad.code}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EspecialidadLista;
