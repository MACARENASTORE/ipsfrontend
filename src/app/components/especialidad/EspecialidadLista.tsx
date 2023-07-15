import React, { useEffect, useState } from "react";
import "./EspecialidadLista.css";

interface Especialidad {
  id: number;
  nombre: string;
  code: string;
}

const EspecialidadLista: React.FC = () => {
  const [especialidades, setEspecialidades] = useState<Especialidad[]>([]);

  useEffect(() => {
    const fetchEspecialidades = async () => {
      try {
        const response = await fetch("http://localhost:8080/especialidades");
        const data = await response.json();
        setEspecialidades(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEspecialidades();
  }, []);

  return (
    <div className="especialidad-lista-container">
      <h2 className="titulo"></h2>
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
            <tr key={especialidad.id}>
              <td>{especialidad.id}</td>
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