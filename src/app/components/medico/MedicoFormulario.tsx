import React, { useEffect, useState } from "react";
import "./MedicoFormulario.css"; // Import CSS for animation


interface Especialidad {
  nombre: string;
  code: number;
  _links: Record<string, { href: string }>;
}

interface Medico {
  nombre: string;
  apellido: string;
  consultorio: string;
  correo: string;
  especialidad: string;
}

const MedicoForm = () => {
  const [especialidades, setEspecialidades] = useState<Especialidad[]>([]);
  const [medico, setMedico] = useState<Medico>({
    nombre: "",
    apellido: "",
    consultorio: "",
    correo: "",
    especialidad: "",
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setMedico((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/medicos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(medico),
      });

      if (!response.ok) {
        throw new Error("No se pudo guardar el registro");
      }

      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
      setMedico({
        nombre: "",
        apellido: "",
        consultorio: "",
        correo: "",
        especialidad: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Agregar Médico</h2>
        <div className="mb-4">
          <label htmlFor="nombre" className="block text-gray-700">
            Nombre:
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={medico.nombre}
            onChange={handleChange}
            className="form-input"
            placeholder="Ingrese Nombre"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="apellido" className="block text-gray-700">
            Apellido:
          </label>
          <input
            type="text"
            id="apellido"
            name="apellido"
            value={medico.apellido}
            onChange={handleChange}
            className="form-input"
            placeholder="Ingrese Apellido"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="consultorio" className="block text-gray-700">
            Consultorio:
          </label>
          <input
            type="text"
            id="consultorio"
            name="consultorio"
            value={medico.consultorio}
            onChange={handleChange}
            className="form-input"
            placeholder="Ingrese Consultorio"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="correo" className="block text-gray-700">
            Correo:
          </label>
          <input
            type="email"
            id="correo"
            name="correo"
            value={medico.correo}
            onChange={handleChange}
            className="form-input"
            placeholder="Ingrese Correo"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="especialidad" className="block text-gray-700">
            Especialidad:
          </label>
          <select
            name="especialidad"
            id="especialidad"
            value={medico.especialidad}
            onChange={handleChange}
            className="form-select"
          >
            <option value="">Seleccione una especialidad</option>
            {especialidades.map((especialidad) => (
              <option key={especialidad.code} value={especialidad._links.Especialidad.href}>
                {especialidad.nombre}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Guardar
        </button>
      </form>
      {submitted && <div className="mt-4 text-green-500">¡Registro insertado exitosamente!</div>}
    </div>
  );
};

export default MedicoForm;