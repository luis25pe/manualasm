import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import imagen from "../images/icono.png";
import "./NASMCourse.css";

/* ✅ IMPORTANTE:
   Mover SECTIONS fuera del componente evita que cambie en cada render
   y elimina el warning react-hooks/exhaustive-deps en Vercel (CI=true).
*/
const SECTIONS = [
  {
    id: 1,
    title: "Introducción al Ensamblador NASM x86",
    content: [
      "¿Qué es NASM y por qué usarlo?",
      "Arquitectura x86 y registros principales",
      "Instalación de NASM y entorno de desarrollo",
    ],
    url: "/introduccion",
  },
  {
    id: 2,
    title: "Fundamentos del Lenguaje",
    content: [
      "Instrucciones básicas (mov, add, sub, cmp, etc.)",
      "Segmentación de código, datos y pila",
      "Modos de direccionamiento",
      "Uso de etiquetas y saltos condicionales",
    ],
    url: "/fundamentos",
  },
  {
    id: 3,
    title: "Llamadas al Sistema y Entrada/Salida",
    content: [
      "Uso de `int 0x80` en Linux",
      "Llamadas a funciones en Windows usando `stdcall`",
      "Manejo de archivos y memoria",
    ],
    url: "/llamadas-sistema",
  },
  {
    id: 4,
    title: "Programación Avanzada",
    content: [
      "Manipulación de la pila y llamadas a funciones",
      "Uso de macros y estructuras",
      "Programación de interrupciones y acceso a hardware",
    ],
    url: "/programacion-avanzada",
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
    url: "/ejercicios",
  },
  {
    id: 6,
    title: "Recursos",
    content: ["Enlaces a documentación", "Tutoriales en video"],
    url: "/recursos",
  },
];

const NASMCoursePage = () => {
  const [activeSection, setActiveSection] = useState(null);

  // ✅ Widget 1: buscador
  const [query, setQuery] = useState("");

  // ✅ Widget 2: progreso (ids completados)
  const [completed, setCompleted] = useState(() => {
    try {
      const raw = localStorage.getItem("nasm_completed_sections");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  // ✅ Widget 3: scroll-to-top (mostrar botón)
  const [showTop, setShowTop] = useState(false);

  const toggleSection = (id) => {
    setActiveSection((prev) => (prev === id ? null : id));
  };

  // ============ Widget 2: Progreso ============
  const toggleCompleted = (id) => {
    setCompleted((prev) => {
      return prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
    });
  };

  useEffect(() => {
    localStorage.setItem("nasm_completed_sections", JSON.stringify(completed));
  }, [completed]);

  const progress = Math.round((completed.length / SECTIONS.length) * 100);

  // ============ Widget 1: Buscador ============
  const filteredSections = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return SECTIONS;

    return SECTIONS.map((s) => {
      const titleMatch = s.title.toLowerCase().includes(q);
      const filteredContent = s.content.filter((item) =>
        item.toLowerCase().includes(q)
      );

      if (titleMatch || filteredContent.length > 0) {
        return { ...s, content: titleMatch ? s.content : filteredContent };
      }
      return null;
    }).filter(Boolean);
  }, [query]);

  // ============ Widget 3: Scroll to Top ============
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 450);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div>
      <header>
        <div className="container header-content">
          <img src={imagen} alt="icono" className="header-image" />
          <div>
            <h1>Ensamblador NASM x86</h1>
            <p>Aprende programación de bajo nivel desde cero</p>

            {/* ✅ WIDGET: Buscador */}
            <div className="widget-search">
              <input
                className="search-input"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar tema o palabra..."
                aria-label="Buscar"
              />
              {query && (
                <button className="search-clear" onClick={() => setQuery("")}>
                  Limpiar
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main>
        <div className="container">
          <div className="course-layout">
            <div>
              {filteredSections.map((section) => (
                <div key={section.id} className="course-section">
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="section-header"
                  >
                    <span>
                      {section.id}. {section.title}
                    </span>
                    <span>{activeSection === section.id ? "−" : "+"}</span>
                  </button>

                  {activeSection === section.id && (
                    <div className="section-content animate-fade">
                      <ul>
                        {section.content.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>

                      <div className="section-actions">
                        {/* Nota: si quieres HTML súper válido W3C, mejor que sea Link con clase,
                            no Link > button. Pero esto funciona en React sin problema. */}
                        <Link to={section.url}>
                          <button className="navigate-button">
                            Ir a la sección
                          </button>
                        </Link>

                        {/* ✅ WIDGET: Marcar completado */}
                        <label className="complete-toggle">
                          <input
                            type="checkbox"
                            checked={completed.includes(section.id)}
                            onChange={() => toggleCompleted(section.id)}
                          />
                          Completado
                        </label>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {filteredSections.length === 0 && (
                <div className="empty-state">
                  <p>No hay resultados para “{query}”.</p>
                </div>
              )}
            </div>

            <div className="sidebar">
              {/* ✅ WIDGET: Progreso */}
              <div className="widget-progress">
                <h2>Progreso</h2>
                <div className="progress-row">
                  <span>
                    {completed.length}/{SECTIONS.length} secciones
                  </span>
                  <span>{progress}%</span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

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

        {/* ✅ WIDGET: Scroll to top */}
        {showTop && (
          <button
            className="scroll-top"
            onClick={scrollToTop}
            aria-label="Volver arriba"
          >
            ↑
          </button>
        )}
      </main>

      <footer>
        <div className="container footer-content">
          <p>
            © {new Date().getFullYear()} Curso de Ensamblador NASM x86. Todos los
            derechos reservados.
          </p>

          <a
            className="whatsapp-btn"
            href="https://wa.me/527731431609"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="whatsapp-icon" aria-hidden="true">
              <svg viewBox="0 0 32 32" width="22" height="22" role="img" focusable="false">
                <path
                  d="M16 3C9.383 3 4 8.383 4 15c0 2.313.66 4.565 1.91 6.516L4 29l7.676-1.844A11.93 11.93 0 0 0 16 27c6.617 0 12-5.383 12-12S22.617 3 16 3zm0 22.05c-1.984 0-3.93-.53-5.625-1.53l-.404-.238-4.56 1.095 1.217-4.446-.262-.43A10.01 10.01 0 0 1 6 15c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10.05zm5.69-7.43c-.31-.155-1.835-.905-2.12-1.01-.285-.105-.49-.155-.695.155-.205.31-.8 1.01-.98 1.22-.18.21-.36.235-.67.08-.31-.155-1.31-.48-2.495-1.535-.92-.82-1.54-1.835-1.72-2.145-.18-.31-.02-.48.135-.635.14-.14.31-.36.465-.54.155-.18.205-.31.31-.515.105-.205.05-.39-.025-.545-.075-.155-.695-1.675-.95-2.295-.25-.6-.505-.52-.695-.53h-.595c-.205 0-.54.075-.825.39-.285.31-1.085 1.06-1.085 2.58s1.11 2.99 1.265 3.2c.155.21 2.185 3.34 5.295 4.68.74.32 1.315.51 1.765.655.74.235 1.415.2 1.95.12.595-.09 1.835-.75 2.095-1.475.26-.725.26-1.345.18-1.475-.08-.13-.285-.205-.595-.36z"
                  fill="currentColor"
                />
              </svg>
            </span>
            Contactar por WhatsApp
          </a>
        </div>
      </footer>
    </div>
  );
};

export default NASMCoursePage;
