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
  const [especialidades, setespecialidades] = useState<Especialidad[]>([]);
  const [medico, setMedico] = useState<Medico>({
    nombre: "",
    apellido: "",
    consultorio: "",
    correo: "",
    especialidad:"",
    
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchespecialidades = async () => {
      try {
        const response = await fetch("http://localhost:8080/especialidades");
        const data = await response.json();
        setespecialidades(data._embedded.especialidades);
      } catch (error) {
        console.error(error);
      }
    };

    fetchespecialidades();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setMedico({
      nombre: e.target.nombre.value,
      apellido: e.target.apellido.value,
      consultorio: e.target.consultorio.value,
      correo: e.target.correo.value,
      especialidad: e.target.especialidad.value,
    });

    console.log(medico);

    try {
      const response = await fetch("http://localhost:8080/medicos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(medico),
      });

      const data = await response.json();
      console.log(data);

      e.target.reset(); // Clear the form
      setSubmitted(true); // Set the submitted state to true
      setTimeout(() => setSubmitted(false), 3000); // Reset the submitted state after 3 seconds
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Nombre" />
        <input type="email" name="email" placeholder="Correo" />
        <input type="text" name="phone" placeholder="Teléfono" />
        <select name="Especialidad">
          <option value="0">Seleccione una Especialidad</option>
          {especialidades.map((Especialidad) => (
            <option key={Especialidad.code} value={Especialidad._links.Especialidad.href}>
              {Especialidad.nombre}
            </option>
          ))}
        </select>
        <button type="submit">Guardar</button>
      </form>
      {submitted && <div className="success-message">Record inserted successfully!</div>}
    </div>
  );
};

export default MedicoForm;
