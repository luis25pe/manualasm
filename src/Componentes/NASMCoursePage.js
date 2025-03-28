import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import imagen from '../images/icono.png';
import './NASMCourse.css';

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
      ],
      url: "/introduccion"
    },
    {
      id: 2,
      title: "Fundamentos del Lenguaje",
      content: [
        "Instrucciones básicas (mov, add, sub, cmp, etc.)",
        "Segmentación de código, datos y pila",
        "Modos de direccionamiento",
        "Uso de etiquetas y saltos condicionales"
      ],
      url: "/fundamentos"
    },
    {
      id: 3,
      title: "Llamadas al Sistema y Entrada/Salida",
      content: [
        "Uso de `int 0x80` en Linux",
        "Llamadas a funciones en Windows usando `stdcall`",
        "Manejo de archivos y memoria"
      ],
      url: "/llamadas-sistema"
    },
    {
      id: 4,
      title: "Programación Avanzada",
      content: [
        "Manipulación de la pila y llamadas a funciones",
        "Uso de macros y estructuras",
        "Programación de interrupciones y acceso a hardware"
      ],
      url: "/programacion-avanzada"
    },
    {
      id: 5,
      title: "Ejercicios Prácticos",
      content: [
        "Impresion de hola en pantalla",
        "Leer algun numero y verlo en pantalla",
        "Suma de dos numeros y mostrar el resultado",
        "Ciclo que imprima hola del 10",
        "El resultado de una suma de dos numeros hara un ciclo que imprima hola",
        "Calculadora basica",
        "Leer con gcc",
        "Suma con gcc",
        "Piramide de asteriscos con gcc",
        "Es par? con gcc",
        "Calculadora con gcc",
        "Raiz cuadrada con gcc",
        "Factorial con gcc",
      ],
      url: "/ejercicios"
    },
    {
      id: 6,
      title: "Recursos",
      content: [
        "Enlaces a documentación",
        "Tutoriales en video"
      ],
      url: "/recursos"
    }
  ];

  const toggleSection = (id) => {
    setActiveSection(activeSection === id ? null : id);
  };

  return (
    <div>
      
      <header>
  <div className="container header-content">
    <img src={imagen} alt="icono" className="header-image" />
    <div>
      <h1>Ensamblador NASM x86</h1>
      <p>Aprende programación de bajo nivel desde cero</p>
    </div>
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
                      <Link to={section.url}>
                        <button className="navigate-button">Ir a la sección</button>
                      </Link>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="sidebar">
              <h2>Contacto</h2>
              <div>
                <div className="info-block">
                  <h3>Creado</h3>
                  <p>Peña Escamilla Luis Angel</p>
                </div>
                <div className="info-block">
                  <h3>Teléfono</h3>
                  <p>772-133-9886</p>
                </div>
                <div className="info-block">
                  <h3>Correo electrónico</h3>
                  <p>pe498775@uaeh.edu.mx</p>
                </div>
                <div className="info-block">
                  <h3>Direccion</h3>
                  <p>Ixmiquilpan</p>
                </div>
                <div className="info-block">
                  <h3>De que trata?</h3>
                  <p>Ensamblador x86</p>
                </div>
                <div className="info-block">
                  <h3>Saber más sobre</h3>
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
