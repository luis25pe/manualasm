import React from "react";
import { Link } from "react-router-dom";
import './IntroNASM.css';

const RecursosNASM = () => {
  return (
    <div className="intro-nasm">
      <h1 className="intro-nasm-title">Recursos de NASM</h1>
      
      <div className="main-container">
        {/* Barra lateral de navegación */}
        <div className="sidebar-nasm">
          <h3 className="sidebar-title">Contenido del Curso</h3>
          <ul className="sidebar-list">
            <li>
              <Link to="/introduccion" className="sidebar-link">
                Introducción al Ensamblador NASM x86
              </Link>
            </li>
            <li>
              <Link to="/fundamentos" className="sidebar-link">
                Fundamentos del lenguaje
              </Link>
            </li>
            <li>
              <Link to="/llamadas-sistema" className="sidebar-link">
                Llamadas al Sistema y Entrada/Salida
              </Link>
            </li>
            <li>
              <Link to="/programacion-avanzada" className="sidebar-link">
                Programación Avanzada
              </Link>
            </li>
            <li>
              <Link to="/ejercicios" className="sidebar-link">
                Ejercicios Prácticos
              </Link>
            </li>
            <li>
              <Link to="/recursos" className="sidebar-link active">
                Recursos
              </Link>
            </li>
          </ul>
        </div>

        {/* Contenido principal de recursos */}
        <div className="content-container">
          {/* Sección: Documentación */}
          <section className="intro-nasm-section">
            <h2 className="intro-nasm-section-title">Documentación y Recursos</h2>
            <ul className="intro-nasm-list">
              <li>
                <a href="https://www.nasm.us/doc/" target="_blank" rel="noopener noreferrer" className="intro-nasm-link">
                  Documentación Oficial de NASM
                </a>
              </li>
              <li>
                <a href="https://www.tutorialspoint.com/assembly_programming/index.htm" target="_blank" rel="noopener noreferrer" className="intro-nasm-link">
                  Tutorial de NASM en TutorialsPoint
                </a>
              </li>
              <li>
                <a href="https://chromium.googlesource.com/chromiumos/docs/+/master/constants/syscalls.md" target="_blank" rel="noopener noreferrer" className="intro-nasm-link">
                  Linux System Call Table
                </a>
              </li>
              <li>
                <a href="https://www.cs.virginia.edu/~evans/cs216/guides/x86.html" target="_blank" rel="noopener noreferrer" className="intro-nasm-link">
                  x86 Assembly Guide
                </a>
              </li>
            </ul>
          </section>

          {/* Sección: Videos en Español */}
          <section className="intro-nasm-section">
            <h2 className="intro-nasm-section-title">Videos</h2>
            <ul className="intro-nasm-list">
              <li>
                <a href="https://www.youtube.com/watch?v=oLsk9J_mViE&list=PLZw5VfkTcc8Mzz6HS6-XNxfnEyHdyTlmP" target="_blank" rel="noopener noreferrer" className="intro-nasm-link">
                  Curso de Ensamblador desde Cero
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com/watch?v=cFhUA7DnIVo&list=PLON3-BoIoWiV0Te8sxsvXw8u2k3DmBZun" target="_blank" rel="noopener noreferrer" className="intro-nasm-link">
                  Introducción a NASM
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com/watch?v=dF1m3rLO5bM" target="_blank" rel="noopener noreferrer" className="intro-nasm-link">
                  Programación en Ensamblador x86
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com/watch?v=tffvKcs83jE" target="_blank" rel="noopener noreferrer" className="intro-nasm-link">
                  Llamadas al Sistema en Linux con NASM
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com/watch?v=mdq4WJUVOIk" target="_blank" rel="noopener noreferrer" className="intro-nasm-link">
                  Depuración de Programas en NASM con GDB
                </a>
              </li>
            </ul>
          </section>
        </div>
      </div>

      {/* Botón para volver al curso */}
      <Link to="/">
        <button className="intro-nasm-button">Volver</button>
      </Link>
    </div>
  );
};

export default RecursosNASM;