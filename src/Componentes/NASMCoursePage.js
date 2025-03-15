import React, { useState } from 'react';
import './NASMCourse.css'; // Importa los estilos CSS

const NASMCoursePage = () => {
  const [activeSection, setActiveSection] = useState(null);

  const sections = [
    {
      id: 1,
      title: "Introducción al Ensamblador NASM x86",
      content: [
        "¿Qué es NASM y por qué usarlo?",
        "Arquitectura x86 y registros principales",
        "Instalación de NASM y entorno de desarrollo"
      ]
    },
    {
      id: 2,
      title: "Fundamentos del Lenguaje",
      content: [
        "Instrucciones básicas (mov, add, sub, cmp, etc.)",
        "Segmentación de código, datos y pila",
        "Modos de direccionamiento",
        "Uso de etiquetas y saltos condicionales"
      ]
    },
    {
      id: 3,
      title: "Llamadas al Sistema y Entrada/Salida",
      content: [
        "Uso de `int 0x80` en Linux",
        "Llamadas a funciones en Windows usando `stdcall`",
        "Manejo de archivos y memoria"
      ]
    },
    {
      id: 4,
      title: "Programación Avanzada",
      content: [
        "Manipulación de la pila y llamadas a funciones",
        "Uso de macros y estructuras",
        "Programación de interrupciones y acceso a hardware"
      ]
    },
    {
      id: 5,
      title: "Ejercicios y Retos",
      content: [
        "Ejercicios básicos (sumas, factorial, Fibbonacci)",
        "Optimización de código en ensamblador",
        "Creación de una mini calculadora",
        "Crackmes básicos para practicar reversing"
      ]
    },
    {
      id: 6,
      title: "Recursos y Comunidad",
      content: [
        "Enlaces a documentación oficial y foros",
        "Tutoriales en video",
        "Espacio para compartir dudas y soluciones"
      ]
    }
  ];

  const toggleSection = (id) => {
    setActiveSection(activeSection === id ? null : id);
  };

  return (
    <div>
      <header>
        <div className="container">
          <h1>Ensamblador NASM x86</h1>
          <p>Aprende programación de bajo nivel desde cero</p>
        </div>
      </header>

      <main>
        <div className="container">
          <div className="course-layout">
            <div>
              {sections.map((section) => (
                <div key={section.id} className="course-section">
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="section-header"
                  >
                    <span>{section.id}. {section.title}</span>
                    <span>{activeSection === section.id ? '−' : '+'}</span>
                  </button>
                  
                  {activeSection === section.id && (
                    <div className="section-content animate-fade">
                      <ul>
                        {section.content.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="sidebar">
              <h2>Información del Curso</h2>
              <div>
                <div className="info-block">
                  <h3>Creado</h3>
                  <p>Peña Escamilla Luis Angel</p>
                </div>
                <div className="info-block">
                  <h3>Sobre</h3>
                  <p>Ensamblador x86</p>
                </div>
                <div className="info-block">
                  <h3>Saber mas sobre</h3>
                  <p>Conocimientos básicos de programación de ensamblador</p>
                </div>  
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer>
        <div className="container">
          <p>© {new Date().getFullYear()} Curso de Ensamblador NASM x86. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default NASMCoursePage;