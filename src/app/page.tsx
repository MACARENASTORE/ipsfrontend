"use client"
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi'; // Importa los íconos de React Icons
import AgregarEspecialidadPage from '../app/especialidad/agregar/page';
import EspecialidadListaPage from '../app/especialidad/lista/page';
import CitaAddPage from "../app/cita/agregar/page";
import CitaListaPage from "../app/cita/lista/page";
import MedicoAddPage from "../app/medico/agregar/page";
import MedicoListaPage from "../app/medico/lista/page";
import PacienteAddPage from "../app/paciente/agregar/page";
import PacienteListaPage from "../app/paciente/lista/page";
import './Page.css';

const Page: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Router>
      <div className="page-container">
        <button className="menu-toggle" onClick={toggleMenu}>
          {isMenuOpen ? <FiX /> : <FiMenu />} {/* Utiliza los íconos correspondientes */}
        </button>
        {isMenuOpen && (
          <nav className="nav-container">
            <ul className="nav-list">
              <li className="nav-item">
                <Link to="/">Inicio</Link>
              </li>
              <li className="nav-item">
                <Link to="/especialidad/agregar">Agregar Especialidad</Link>
              </li>
              <li className="nav-item">
                <Link to="/especialidad/lista">Lista de Especialidades</Link>
              </li>
              <li className="nav-item">
                <Link to="/cita/agregar">Agregar Cita</Link>
              </li>
              <li className="nav-item">
                <Link to="/cita/lista">Lista de Citas</Link>
              </li>
              <li className="nav-item">
                <Link to="/medico/agregar">Agregar Médico</Link>
              </li>
              <li className="nav-item">
                <Link to="/medico/lista">Lista de Médicos</Link>
              </li>
              <li className="nav-item">
                <Link to="/paciente/agregar">Agregar Paciente</Link>
              </li>
              <li className="nav-item">
                <Link to="/paciente/lista">Lista de Pacientes</Link>
              </li>
            </ul>
          </nav>
        )}

        <Routes>
          <Route path="/" element={<h1>Inicio</h1>} />
          <Route path="/especialidad/agregar" element={<AgregarEspecialidadPage />} />
          <Route path="/especialidad/lista" element={<EspecialidadListaPage />} />
          <Route path="/cita/agregar" element={<CitaAddPage />} />
          <Route path="/cita/lista" element={<CitaListaPage />} />
          <Route path="/medico/agregar" element={<MedicoAddPage />} />
          <Route path="/medico/lista" element={<MedicoListaPage />} />
          <Route path="/paciente/agregar" element={<PacienteAddPage />} />
          <Route path="/paciente/lista" element={<PacienteListaPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default Page;
